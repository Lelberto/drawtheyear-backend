import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsDayDate } from '../../../common/decorators/validation/is-day-date.decorator';
import { Place } from './place.enum';
import { Visibility } from './visibility.enum';

export class CreateDayDto {

  @IsDayDate()
  @IsNotEmpty()
  public date: Date;

  @IsString()
  @IsOptional()
  public resume?: string;

  @IsEnum(Visibility)
  @IsOptional()
  public visibility?: Visibility;
}

export class UpdateDayDto extends PartialType(OmitType(CreateDayDto, ['date'])) {}

export class AddEmotionToDayDto {
  
  @IsString()
  @IsNotEmpty()
  public emotionId: string;

  @IsEnum(Place)
  @IsOptional()
  public place: 'start' | 'end';
}

export class RemoveEmotionFromDayDto extends OmitType(AddEmotionToDayDto, ['place']) {}

export class FindDaysQueryDto {

  @IsString()
  @IsOptional()
  public year?: string;
}
