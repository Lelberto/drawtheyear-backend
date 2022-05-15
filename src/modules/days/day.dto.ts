import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';
import * as moment from 'moment';
import { IsSpecificDate } from '../../decorators/is-specific-date.decorator';

/**
 * DTO for day creation
 */
export class CreateDayDto {

  @ApiProperty()
  @IsSpecificDate()
  public readonly date: Date;

  @ApiProperty()
  @IsString()
  public readonly description: string;
}

/**
 * DTO for day update
 */
export class UpdateDayDto extends OmitType(CreateDayDto, ['date']) {}

/**
 * DTO for user days between two dates query
 */
export class UserDaysQueryDto {

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => moment(value, 'YYYY-MM-DD').toDate())
  public readonly from: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => moment(value, 'YYYY-MM-DD').toDate())
  public readonly to: Date;
}
