import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDsrDto } from 'src/DTO/userDsr.create.dto';

import { RedisService } from 'src/redis/redis.service';

import { UserDsr } from 'src/schema/userDsr.schema';

@Injectable()
export class DsrService {

    constructor(@InjectModel(UserDsr) private userDsrModel:typeof UserDsr,private redisService:RedisService){}

    async createDsr(user,dsrData:UserDsrDto,authToken:string){
        const id:number=user.id;
        // const key:string="dsr"+user.id;

        // const data=this.redisService.get(key);
        // if(data!=null){return " "}
        // await this.redisService.set(key,authToken,8*3600000);
        if(dsrData.noWorkdone==true){
            const createdDsr = await this.userDsrModel.create({
                userId:id,
                projectName:dsrData.projectName,
                estimatedHour:dsrData.estimatedHour,
                noWorkdone:true,
                report:"no workDone",
            });
            return `Dsr Created with id:${createdDsr.id}`;
        }
        else{
            const createdDsr = await this.userDsrModel.create({
                userId:id,
                projectName:dsrData.projectName,
                estimatedHour:dsrData.estimatedHour,
                report:dsrData.report
            });
            return `Dsr Created:${createdDsr.id}`;
        }
    }

    async updateDsr(updateData:Record<string,any>){
        const id:number=updateData.id;
        const updateUser = await this.userDsrModel.update(
            { estimatedHour:updateData.estimatedHour,report:updateData.report },
            { where: { id: id } }
        );
        return "dsr update successfully";
    }

    async getAllDsr(user){
        const page = 1; 
        const pageSize = 5;
        const id:number=user.id;
        const alldsr=await this.userDsrModel.findAll({
            where: { userId:id },
            limit: pageSize,
            offset: (page - 1) * pageSize, 
            order: [['createdAt', 'ASC']] 
          });
          
          return alldsr;
    }

    async getDsrByID(dsrID:number){
       const dsr=await this.userDsrModel.findByPk(dsrID);
       return dsr;

    }
}
