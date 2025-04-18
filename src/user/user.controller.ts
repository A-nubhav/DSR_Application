import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userservice:UserService){}
    @Get("/profile")
    getProfile(@Req() request:Request){
     const { authorization }: any = request.headers;
     const authToken = authorization.replace(/bearer/gim, '').trim();
     return this.userservice.getProfile(authToken);
    }
}
