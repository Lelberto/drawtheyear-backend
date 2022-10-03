import { IsDate, IsString } from 'class-validator';

export class CreateDayDto {

  @IsDate()
  public date: Date;

  @IsString()
  public resume: string;
}
