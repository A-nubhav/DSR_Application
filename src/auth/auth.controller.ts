import { Body, Controller, Get, Ip, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from 'src/DTO/user.register.dto';

@Controller('auth')
export class AuthController {
    constructor(private AuthService:AuthService){}

   //  @Get("/profile")
   //  getProfile(@Req() request:Request){
   //   const { authorization }: any = request.headers;
   //   const authToken = authorization.replace(/bearer/gim, '').trim();
   //   return this.AuthService.getProfile(authToken);
   //  }

    @Post("/register")
    userSignup(@Body() userData:UserRegisterDto,@Ip() ip:string){
       return this.AuthService.userSignup(userData,ip);

    }
    @Post("/login")
    userSignin(@Body() userData:UserRegisterDto){
       return this.AuthService.userSignin(userData);
    }
    
    @Post("/logout")
    userSignout(@Req() request: Request){
       const { authorization }: any = request.headers;
       const authToken = authorization.replace(/bearer/gim, '').trim();
       return this.AuthService.userSignout(authToken);
    }
}
