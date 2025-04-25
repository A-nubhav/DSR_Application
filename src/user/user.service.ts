import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/schema/userProfile.schema';

@Injectable()
export class UserService {
     constructor(@InjectModel(User) private userModel: typeof User){}
    async getProfile(user){
        const id:number=user.id;
        const userProfile= await this.userModel.findByPk(id);
        return `userProfile:${userProfile}`;
    }

    async updateUser(user,userUpdateData){
        const id:number=user.id;
        const userupdated = await this.userModel.update(
            { name:userUpdateData.name},
            { where: { id:id } }
        );
        return "user profile updated";
    }
}
