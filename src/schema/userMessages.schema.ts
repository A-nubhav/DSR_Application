import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './userProfile.schema';

export type UserDocument = UserMessages & Document;

@Schema()
export class UserMessages{
  @Prop()
  senderIDEmail:string;

  @Prop()
  receiverIDEmail:string;

  @Prop()
  message:string;
}

export const UserMessagesSchema = SchemaFactory.createForClass(UserMessages);
