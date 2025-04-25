import { Module } from '@nestjs/common';
import { DsrService } from './dsr.service';
import { DsrController } from './dsr.controller';
// import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDsr } from 'src/schema/userDsr.schema';
import { helperModule } from 'src/helper/helper.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports:[SequelizeModule.forFeature([UserDsr]),helperModule,RedisModule],
  providers: [DsrService],
  controllers: [DsrController]
})
export class DsrModule {}
