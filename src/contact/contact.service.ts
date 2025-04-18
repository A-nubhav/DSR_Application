import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { helperService } from 'src/helper/helper.service';
import { UserFriendList } from 'src/schema/userFriendList.schema';



@Injectable()
export class ContactService {
    constructor(@InjectModel(UserFriendList.name) private friendListSchema: Model<UserFriendList>,
        private helperService: helperService) { }

    async sendRequest(data: Record<string, any>, authToken: string) {
        if (!authToken) {
            return "token required";
        }
        const decodedData = await this.helperService.verifyToken(authToken);
        if (decodedData.error) {
            return "INVALID TOKEN";
        }
        const requestCreated = await this.friendListSchema.create({
            userSender: decodedData.email,
            userReciever: data.email,
            requestStatus:0
        });
        console.log(requestCreated);
        return "message request sent";
    }

    async acceptRequest(data: Record<string, any>, authToken: string) {
        if (!authToken) {
            return "token required";
        }
        const decodedData = await this.helperService.verifyToken(authToken);
        if (decodedData.error) {
            return "INVALID TOKEN";
        }
        const userstatus = await this.friendListSchema.findOne({ userSender:data.email, userReciever: decodedData.email });
        if (userstatus != null && userstatus.requestStatus == 0) {
            await this.friendListSchema.updateOne({ userSender: data.email, userReciever: decodedData.email}, { requestStatus: 1 });
            return "message request Accepted";
        }
        else if (userstatus != null && userstatus.requestStatus == 1) {
            return "already friend";
        }
        return "no request from give user";
    }

    async rejectRequest(data: Record<string, any>, authToken: string) {
        if (!authToken) {
            return "token required";
        }
        const decodedData = await this.helperService.verifyToken(authToken);
        if (decodedData.error) {
            return "INVALID TOKEN";
        }
        const userstatus = await this.friendListSchema.findOne({ userSender: data.email, userReciever: decodedData.email });
        if (userstatus != null && userstatus.requestStatus == 1) {
            await this.friendListSchema.updateOne({ userSender: decodedData.email, userReciever: data.email}, { requestStatus: 0 });
            return "message request Accepted";
        }
        else if (userstatus != null && userstatus.requestStatus == 0) {
            return "first accepted the request";
        }
        return "user didn't  requested yet";
    }

    async getAllContact(authToken:string){
        if (!authToken) {
            return "token required";
        }
        const decodedData = await this.helperService.verifyToken(authToken);
        if (decodedData.error) {
            return "INVALID TOKEN";
        }
        const DBdata=await this.friendListSchema.find({userReciever:decodedData.email ,requestStatus:1});
        if(DBdata.length==0){
            return "no friends";
        }
        else{
            return `your firend list: ${DBdata}`;
        }
    }
}
