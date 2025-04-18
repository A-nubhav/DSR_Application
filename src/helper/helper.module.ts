import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { helperService } from './helper.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {expiresIn: configService.get<string>('jwt.expiry')}
      }),
      inject:[ConfigService]
    })


  ],
  providers: [helperService],
  exports:[helperService]
})
export class helperModule {}
