import { IsBoolean, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserLogininDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  deviceID:string;
}
