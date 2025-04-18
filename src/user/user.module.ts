import { Module } from '@nestjs/common';
import { helperService } from 'src/helper/helper.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from 'src/schema/userProfile.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { helperModule } from 'src/helper/helper.module';

@Module({
imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),helperModule],
controllers:[UserController],
providers:[UserService]
})
export class UserModule {}
