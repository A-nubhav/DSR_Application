import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { helperService } from 'src/helper/helper.service';
import { User } from 'src/schema/userProfile.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserSchema:Model<User> ,private helperService:helperService ){}
    async getProfile(authToken:string){
        if(!authToken){
            return "token required";
         }
        const decodedData= await this.helperService.verifyToken(authToken);
        if(decodedData.error){
            return "INVALID TOKEN";
        }
        const DBdata = await this.UserSchema.findOne({_id:decodedData._id},{email:1,name:1,friendCout:1,requestCount:1});
        return `user data ${DBdata}`;
       }
}
