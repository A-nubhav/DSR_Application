import { Table, Column, Model, ForeignKey, BelongsTo, DataType, AllowNull } from 'sequelize-typescript';
import { User } from './userProfile.schema';
// import { User } from './userProfile.schema';

@Table({
  tableName: 'userDsrs',
  timestamps: true,
})
export class UserDsr extends Model {
  @Column({
    type: DataType.STRING,
  })
  projectName:string;

  @Column({
    type: DataType.INTEGER,
  })
  estimatedHour:number ;

  @Column({
    type: DataType.STRING,
  })
  report:string;

  @Column({
    type: DataType.BOOLEAN,
  })
  noWorkdone:boolean;

  @Column({
    type:DataType.INTEGER
  })
  userId: number;

}
