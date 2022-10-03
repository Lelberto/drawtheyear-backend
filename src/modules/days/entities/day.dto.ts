import { IsNotEmpty, IsString } from 'class-validator';
import { IsDayDate } from '../../../common/decorators/validation/is-day-date.decorator';

export class CreateDayDto {

  @IsDayDate()
  @IsNotEmpty()
  public date: Date;

  @IsString()
  public resume: string;
}
