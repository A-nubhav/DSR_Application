import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { DsrService } from './dsr.service';

import { jwtGuard } from 'src/guards/jwt-guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { audit } from 'rxjs';
import { UserDsrDto } from 'src/DTO/userDsr.create.dto';

@Controller('dsr')
export class DsrController {
    constructor(private dsrService:DsrService){}

    @ApiBearerAuth('JWT')
    @Post()
    @UseGuards(jwtGuard)
    createDsr(@Req() request,@Body() dsrData:UserDsrDto){
        const { authorization }: any = request.headers;
        const authToken = authorization.replace(/bearer/gim, '').trim();
        return this.dsrService.createDsr(request.user,dsrData,authToken);
    }

    @ApiBearerAuth('JWT')
    @Put()
    @UseGuards(jwtGuard)
    updateDsr(@Body() updateData:Record<string,any>){
         return this.dsrService.updateDsr(updateData);
    }

    @ApiBearerAuth('JWT')
    @Get('/alldsr')
    @UseGuards(jwtGuard)
    getAllDsr(@Req() request){
         return this.dsrService.getAllDsr(request.user);
    }


    @ApiBearerAuth('JWT')
    @Get('/:dsrID')
    @UseGuards(jwtGuard)
    getDsrByID(@Param('dsrID') dsrID:number){
        return this.dsrService.getDsrByID(dsrID);
    }

}
