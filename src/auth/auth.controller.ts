import { Body, Controller, Get, Ip, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from 'src/DTO/user.register.dto';
// import { JwtAuthGuard } from './guards/jwt-guard.guard';
import { jwtGuard } from 'src/guards/jwt-guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserLogininDto } from 'src/DTO/user.login.dto';


@Controller('auth')
export class AuthController {
    constructor(private AuthService:AuthService){}

   
    @Post("/register")
    userSignup(@Body() userData:UserRegisterDto,@Ip() ip:string){
       return this.AuthService.userSignup(userData,ip);

    }
    
    @Post("/login")
    userSignin(@Body() userData:UserLogininDto){
       return this.AuthService.userSignin(userData);
    }
    
    @ApiBearerAuth('JWT')
    @UseGuards(jwtGuard)
    @Post("/logout")
    userSignout(@Req() request){
      //  console.log(request.user);
       return this.AuthService.userSignout(request.user);
    }
    
    @ApiBearerAuth('JWT')
    @UseGuards(jwtGuard)
    @Post('/forgotpassword')
    forgotPassword(@Req() request,@Body() password:Record<string,string>){
      const { authorization }: any = request.headers;
        const authToken = authorization.replace(/bearer/gim, '').trim();
      return this.AuthService.forgotPassword(request.user,authToken,password.password);
    }

}
