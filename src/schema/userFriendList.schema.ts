import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
// import { User } from './userProfile.schema';

export type UserDocument = UserFriendList & Document;

@Schema()
export class UserFriendList{

  @Prop()
  userSender:string;

  @Prop()
  userReciever:string;

  @Prop({default:-1})
  requestStatus:number;

}

export const UserFriendListSchema = SchemaFactory.createForClass(UserFriendList);
