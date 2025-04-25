import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { jwtGuard } from 'src/guards/jwt-guard';
import { request } from 'http';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @ApiBearerAuth('JWT')
    @Get('/profile')
    @UseGuards(jwtGuard)
    getProfile(@Req() request){
        return this.userService.getProfile(request.user);
    }

    @ApiBearerAuth('JWT')
    @Patch('updateprofile')
    updateProfile(@Req() request,@Body() updateData:Record<string,any>){
        return this.userService.updateUser(request.user,updateData);
    }
}
