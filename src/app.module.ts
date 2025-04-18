import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
// import { UserService } from './user/user.service';
// import { UserController } from './user/user.controller';
// import { UserModule } from './user/user.module';
// import { ContactModule } from './contact/contact.module';
import { MessageModule } from './message/message.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env',
      load:[configuration]
    }),
    MongooseModule.forRootAsync({
      useFactory: async (ConfigService:ConfigService)=>({
           uri:ConfigService.get<string>('db.uri')
      }),
      inject:[ConfigService]
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute window
      limit: 5,    // 5 requests per window
    }]),
    AuthModule,UserModule,ContactModule, MessageModule,MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
