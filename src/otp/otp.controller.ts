import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OtpService } from './otp.service';
import { otpGuard } from 'src/guards/otp-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('otp')
export class OtpController {
     constructor(private otpService:OtpService){}

     @ApiBearerAuth('JWT')
     @UseGuards(otpGuard)
    @Post('sendotp')
    sendOtp(@Req() request){
        return this.otpService.sendOtp(request.user);
    }
    
    @ApiBearerAuth('JWT')
    @UseGuards(otpGuard)
    @Post('verifyotp')
    verifyOtp(@Req() request,@Body() userotp:Record<string,string>){
        const { authorization }: any = request.headers;
        const authToken = authorization.replace(/bearer/gim, '').trim();
        return this.otpService.verifyOtp(request.user,userotp,authToken);
    }
}
