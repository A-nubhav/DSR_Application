import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import {configuration} from './config/configuration';
// import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisModule } from '@nestjs-modules/ioredis';
// import { OtpModule } from './otp/otp.module';
import { SequelizeModule } from '@nestjs/sequelize';
// import { UserDsr } from './schema/userDsr.schema';
import { User } from './schema/userProfile.schema';
import { OtpModule } from './otp/otp.module';
import { UserModule } from './user/user.module';
import { DsrModule } from './dsr/dsr.module';
import { UserDsr } from './schema/userDsr.schema';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,  
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password:'postgres',
        database:'dsr_db',
        models: [User,UserDsr],
        synchronize: true,
        // define: {
        //   underscored: true, // Global snake_case setting
        //   freezeTableName: true // Prevents pluralization
        // },
        autoLoadModels: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute window
      limit: 5,    // 5 requests per window configService.get<string>('DB_NAME')
    }]),
    AuthModule,RedisModule,OtpModule, UserModule,DsrModule, S3Module],
  controllers: [AppController],
  providers: [AppService]

})
export class AppModule {}

