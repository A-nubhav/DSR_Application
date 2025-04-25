import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';


import { helperModule } from 'src/helper/helper.module';
import { AuthService } from './auth.service';

import { RedisModule } from 'src/redis/redis.module';
import { User } from 'src/schema/userProfile.schema';
import { SequelizeModule } from '@nestjs/sequelize';



@Module({
  imports:[ SequelizeModule.forFeature([User]),helperModule,RedisModule],
  controllers: [AuthController],  
  providers:[AuthService]
})
export class AuthModule {}
