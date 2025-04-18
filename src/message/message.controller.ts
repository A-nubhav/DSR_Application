import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { Throttle } from '@nestjs/throttler';
// import { request } from 'http';

@Controller('message')
export class MessageController {
   
    constructor(private messageService:MessageService){}
    
    @Post()
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    sendMessages(@Body() data:Record<string,any>,@Req() request:Request){
        const { authorization }: any = request.headers;
       const authToken = authorization.replace(/bearer/gim, '').trim();
       return this.messageService.sendMessages(authToken,data);
    }
    @Get(':email')
    getMessages(@Query() query:Record<string,any>,@Req() request:Request,@Param('email') param:string){
        const { authorization }: any = request.headers;
       const authToken = authorization.replace(/bearer/gim, '').trim();
       return this.messageService.getMessages(authToken,query,param);
    }
}
