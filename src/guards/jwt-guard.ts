
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { helperService } from 'src/helper/helper.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class jwtGuard implements CanActivate {
  constructor(private helperService:helperService, private redisService:RedisService){}
 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];
     
    try {
      const payload = await this.helperService.verifyToken(token);
      request['user'] = payload; // You can attach decoded user to request
      const data=await this.redisService.get(payload.email);
    //   console.log(data);
      if(!data){
        throw new UnauthorizedException('Invalid or expired token');
      }
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

}
