import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import * as nodemailer from 'nodemailer';
import { helperService } from 'src/helper/helper.service';
@Injectable()
export class OtpService {
    constructor(private redisService: RedisService,private helperService:helperService) { }

    async sendOtp(user) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        try {
            // 1. Create a Transporter
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: 'anubhav.misr@gmail.com', // Replace with your Gmail
                    pass: "ditgldtoygufhyzu"// Replace with your Gmail password or App Password
                }
            });

            // 2. Define Mail Options
            let mailOptions = {
                from: process.env.adminMail, // Sender Email
                to: user.email, // Receiver Email
                subject: "mail for reset password", // Email Subject
                text: `verification code ${otp}` // Email Body (Plain Text)
            };
  
            // 3. Send Email
            let info = await transporter.sendMail(mailOptions);
            console.log("Email Sent: " + info.response);

            const key:string=user.email+user.id+"otp";
            await this.redisService.set(key,otp,5*60*1000);
            return "otp has been sent successfully";
        } catch (error) {
            throw new BadRequestException('try after some time');
        }
    }

    async verifyOtp(user,userOtp:Record<string,string>,authtoken:string){
        const key:string=user.email+user.id+"otp";
        const newKey:string=user.email+user.id+"verifiedOtp";
        const otp=await this.redisService.get(key);
        console.log("dbotp",otp);
        console.log('userotp',userOtp.otp);

        if(otp!=null && userOtp.otp==otp){
            await this.redisService.del(key);
            await this.redisService.set(newKey,authtoken,3600000);
            // const otpToken= await this.helperService.generateToken({id:user.id,email:user.email});
            return "otp verified";
        }
        else if(otp!=null && otp!=userOtp.otp){
            return "otp not verified";
        }
        else{
            return "send otp first";
        }
    }
}
