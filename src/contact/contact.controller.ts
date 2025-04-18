import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService) { }

    @Post('request')
    sendRequest(@Body() data: Record<string, any>, @Req() request: Request) {
        const { authorization }: any = request.headers;
        const authToken = authorization.replace(/bearer/gim, '').trim();
        return this.contactService.sendRequest(data, authToken);
    }
    @Post('accept')
    acceptRequest(@Body() data: Record<string, any>, @Req() request: Request) {
        const { authorization }: any = request.headers;
        const authToken = authorization.replace(/bearer/gim, '').trim();
        return this.contactService.acceptRequest(data, authToken);
    }
    @Post('reject')
    rejectRequest(@Body() data: Record<string, any>, @Req() request: Request) {
        const { authorization }: any = request.headers;
        const authToken = authorization.replace(/bearer/gim, '').trim();
        return this.contactService.rejectRequest(data, authToken);
    }
    @Get('')
    allContact(@Req() request:Request){
        const { authorization }: any = request.headers;
        const authToken = authorization.replace(/bearer/gim, '').trim();
        return this.contactService.getAllContact(authToken);
    }
}
