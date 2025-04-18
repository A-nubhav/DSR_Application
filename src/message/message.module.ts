import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UserMessages, UserMessagesSchema } from 'src/schema/userMessages.schema';
import { UserFriendList, UserFriendListSchema } from 'src/schema/userFriendList.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { helperModule } from 'src/helper/helper.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: UserMessages.name, schema: UserMessagesSchema },{name:UserFriendList.name,schema:UserFriendListSchema}]),helperModule],
  providers: [MessageService],
  controllers: [MessageController]
})
export class MessageModule {}
