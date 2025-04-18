import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/userProfile.schema';
import { helperModule } from 'src/helper/helper.module';
import { UserMessages, UserMessagesSchema } from 'src/schema/userMessages.schema';
import { RequestRecieved, requestRecievedSchema } from 'src/schema/userRequestRecieved.schema';
import { UserFriendList, UserFriendListSchema } from 'src/schema/userFriendList.schema';

@Module({
   imports:[ MongooseModule.forFeature([{name:UserFriendList.name ,schema:UserFriendListSchema}]),helperModule],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
