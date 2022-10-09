import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsDayDate } from '../../../common/decorators/validation/is-day-date.decorator';

export class CreateDayDto {

  @IsDayDate()
  @IsNotEmpty()
  public date: Date;

  @IsString()
  public resume: string;
}

export class UpdateDayDto extends PartialType(OmitType(CreateDayDto, ['date'])) {}

export class AddEmotionToDayDto {
  
  @IsString()
  @IsNotEmpty()
  public emotionId: string;
}

export class RemoveEmotionFromDayDto extends AddEmotionToDayDto {}
