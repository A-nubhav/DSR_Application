import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './userProfile.schema';

export type UserDocument = RequestRecieved & Document;

@Schema()
export class RequestRecieved{
  @Prop({ref:User.name})
  senderID:mongoose.Schema.Types.ObjectId;

  @Prop({ref:User.name})
  userID:mongoose.Schema.Types.ObjectId;

}

export const requestRecievedSchema = SchemaFactory.createForClass(RequestRecieved);
