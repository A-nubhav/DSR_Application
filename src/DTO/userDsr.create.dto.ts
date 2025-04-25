import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UserDsrDto {
  @IsNotEmpty()
  projectName: string;

  @IsNumber({})
  @Min(0)
  @Max(8)
  estimatedHour:number;
  
  @IsBoolean()
  @IsNotEmpty()
  noWorkdone:true
  
  report:string;
}
