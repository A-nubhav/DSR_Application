
import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,   
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: 'is_active' 
  })
  declare isActive: boolean;

  @Column({
    type:DataType.STRING,
    allowNull:true
  })
  declare profilePicture:string;
  
  
}