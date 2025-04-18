import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { helperService } from 'src/helper/helper.service';
import { UserFriendList } from 'src/schema/userFriendList.schema';
import { UserMessages } from 'src/schema/userMessages.schema';

@Injectable()
export class MessageService {

    constructor(@InjectModel(UserMessages.name) private UserMessagesSchema: Model<UserMessages>, @InjectModel(UserFriendList.name) private UserFriendSchema: Model<UserFriendList>,
        private helperService: helperService) { }
    async sendMessages(authToken: string, data: Record<string,any>) {
        if (!authToken) {
            return "token required";
        }
        const decodedData = await this.helperService.verifyToken(authToken);
        if (decodedData.error) {
            return "INVALID TOKEN";
        }
        const isFriend=await this.UserFriendSchema.findOne({userReciever:decodedData.email,userSender:data.email,requestStatus:1});
        if(isFriend){
          const messageSent= await this.UserMessagesSchema.create({
                senderIDEmail:decodedData.email,
                receiverIDEmail:data.email,
                message:data.message
            });
            console.log(messageSent);
            return "message has been send";
        }
        return "your are not a friend of requested user";

    }

    async getMessages(authToken: string, query: Record<string, any>,param:string) {
        if (!authToken) {
            return "token required";
        }
        const decodedData = await this.helperService.verifyToken(authToken);
        if (decodedData.error) {
            return "INVALID TOKEN";
        }
        const skip = ((query.page) - 1) * (query.limit);
        const receivedMessages=await this.UserMessagesSchema.find({senderIDEmail:param,receiverIDEmail:decodedData.email})
        .skip(skip)
        .limit(query.limit)
        .sort({ createdAt: -1 });

        if(receivedMessages==null){
            return "No messages";
        }
        else{
            return `your messages :${receivedMessages[0]}`;
        }

    }
    
}
