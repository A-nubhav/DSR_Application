import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLogininDto } from 'src/DTO/user.login.dto';
import { UserRegisterDto } from 'src/DTO/user.register.dto';
import { User } from 'src/schema/userProfile.schema';
import * as bcrypt from 'bcrypt';
import { helperService } from 'src/helper/helper.service';


@Injectable()
export class AuthService {
    private readonly saltRounds = 10;
   constructor(@InjectModel(User.name) private UserSchema:Model<User> ,
         private helperService:helperService ){}
    async userSignup(userData:UserRegisterDto,ip:string){
        const alreadyExist=await this.UserSchema.findOne({email:userData.email});
        console.log(alreadyExist);
        // return `message `;
        if(alreadyExist){
            return "redirect to login route";
        } 
        const hashPassword=await bcrypt.hash(userData.password, this.saltRounds);
        const user= await this.UserSchema.create({
            email:userData.email,
            password:hashPassword,
            name:userData.name,
            isActive:false,
            friendCount:0,
            requestCount:0,
            ip:ip
        });
        console.log(user);
        return "Account created";
   }    

   async userSignin(userData:UserLogininDto){
        //  console.log(userData.email);
        const userDBdata=await this.UserSchema.findOne({email:userData.email});
        console.log(userDBdata);
        if(!userDBdata){
            return "redirect to signup route";
        }
        // console.log(userDBdata);
        const isMatch=await bcrypt.compare(userData.password,userDBdata.password);
        if(!isMatch){
            return "invalid credentials";
        }
        const token= await this.helperService.generateToken({_id:userDBdata._id,email:userDBdata.email});
        if(userDBdata.isActive){
            return `already logged in Token:${token}`;
        }
        const user=await this.UserSchema.updateOne({email:userDBdata.email},{
            isActive:true
        });

        return `logged in succesfully Token:${token}`;
   }

   async userSignout(token:string){
     if(!token){
        return "token required";
     }
    const decodedData= await this.helperService.verifyToken(token);
    if(decodedData.error){
        return "INVALID TOKEN";
    }
    const DBdata = await this.UserSchema.findOne({_id:decodedData._id});
    if(DBdata==null){
        return "redirect to signup";
    }
    if(DBdata!=null && !DBdata.isActive){
        return "already logged out"; 
    }
    const user=await this.UserSchema.updateOne({_id:decodedData.sub},{
        isActive:false
    });
    console.log(user);
    return "logged out successfully";
   }


//    async getProfile(authToken:string){
//     if(!authToken){
//         return "token required";
//      }
//     const decodedData= await this.helperService.verifyToken(authToken);
//     if(decodedData.error){
//         return "INVALID TOKEN";
//     }
//     const DBdata = await this.UserSchema.findOne({_id:decodedData._id},{email:1,name:1,friendCout:1,requestCount:1});
//     return `user data ${DBdata}`;
//    }
}
