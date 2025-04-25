import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/schema/userProfile.schema';
import { RedisModule } from 'src/redis/redis.module';
import { helperModule } from 'src/helper/helper.module';

@Module({
  imports:[SequelizeModule.forFeature([User]),RedisModule,helperModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
