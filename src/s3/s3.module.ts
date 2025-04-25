import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import sequelize from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/schema/userProfile.schema';
import { RedisModule } from 'src/redis/redis.module';
import { helperModule } from 'src/helper/helper.module';

@Module({
  imports:[
    RedisModule,
    helperModule,
    ConfigModule,
    MulterModule.register({
      dest: './uploads'
    }),
    SequelizeModule.forFeature([User])
  ],
  controllers: [S3Controller],
  providers: [S3Service],
})
export class S3Module {}