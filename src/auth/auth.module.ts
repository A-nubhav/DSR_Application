import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/userProfile.schema';
import { helperModule } from 'src/helper/helper.module';
import { AuthService } from './auth.service';

@Module({
  imports:[ MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),helperModule],
  controllers: [AuthController],
  providers:[AuthService]
})
export class AuthModule {}
