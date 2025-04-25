import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserLogininDto } from 'src/DTO/user.login.dto';
import { UserRegisterDto } from 'src/DTO/user.register.dto';
import { User } from 'src/schema/userProfile.schema';
import * as bcrypt from 'bcrypt';
import { helperService } from 'src/helper/helper.service';

// Add this import to any service using cache
import { RedisService } from 'src/redis/redis.service';




@Injectable()
export class AuthService {
    private readonly saltRounds = 10;
    constructor(@InjectModel(User) private userModel: typeof User,
        private helperService: helperService, private redisService: RedisService) { }

    async userSignup(userData: UserRegisterDto, ip: string) {
        const alreadyExist = await this.userModel.findOne({
            where: { email: userData.email }
        });

        // console.log(alreadyExist);
        // return `message `;
        if (alreadyExist) {
            return "redirect to login route";
        }
        // console.log(userData)
        const hashPassword = await bcrypt.hash(userData.password, this.saltRounds);
        const user = await this.userModel.create({
            name: userData.name,
            email: userData.email,
            password: hashPassword,
            isActive: false
        });
        console.log(user);
        return "Account created";
    }

    async userSignin(userData: UserLogininDto) {
        //  console.log(userData.email);
        const userDBdata = await this.userModel.findOne({
            where: { email: userData.email }
        });
        console.log(userDBdata);
        if (!userDBdata) {
            return "redirect to signup route";
        }
        // console.log(userDBdata);i
        const isMatch = await bcrypt.compare(userData.password, userDBdata.password);
        if (!isMatch) {
            return "invalid credentials";
        }

        const token = await this.helperService.generateToken({ id: userDBdata.id, email: userDBdata.email });
        // console.log("hii");
        await this.redisService.set(userDBdata.email, token, 3600000);
        // const data=await this.redisService.get(userDBdata.email);
        // console.log(data);
        // console.log("hii");

        if (userDBdata.isActive) {
            // console.log(userDBdata.id);
            return `already logged in Token:${token}`;
        }
        // console.log("hii");
        const user = await this.userModel.update(
            { isActive: true },
            { where: { id: userDBdata.id } }
        );
        return `logged in succesfully Token:${token}`;

    }

    async userSignout(user) {
        // console.log(user._id);
        const id: number = user.id;
        const DBdata = await this.userModel.findByPk(id);
        if (DBdata == null) {
            return "redirect to signup";
        }

        if (DBdata != null && !DBdata.isActive) {
            return "already logged out";
        }
        const updateUser = await this.userModel.update(
            { isActive: false },
            { where: { id: id } }
        );

        await this.redisService.del(user.email);
        // console.log(updateUser);
        return "logged out successfully";
    }


    async forgotPassword(user, authToken: string, password: string) {
        const id: number = user.id;
        const newKey: string = user.email + user.id + "verifiedOtp";
        const key: string = user.email + user.id;
        const data = await this.redisService.get(newKey);


        
        if (data == null) {
            await this.redisService.set(key, authToken, 3600000);
            return `send otp request`;
        }
        else {
            await this.redisService.del(key);
            await this.redisService.del(newKey);
            const hashPassword = await bcrypt.hash(password, this.saltRounds);
            const updateUser = await this.userModel.update(
                { password: hashPassword },
                { where: { id: id } }
            );
            console.log(updateUser);
            return "password updated";

        }

    }
}