import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { RedisModule } from 'src/redis/redis.module';
import { helperModule } from 'src/helper/helper.module';
// import { User } from 'src/schema/userProfile.schema';
// import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports:[RedisModule,helperModule],
  providers: [OtpService],
  controllers: [OtpController],
  exports:[OtpService]
})
export class OtpModule {}
