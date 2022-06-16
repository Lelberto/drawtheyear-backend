import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';
import moment from 'moment';
import { IsSpecificDate } from '../../../decorators/is-specific-date.decorator';
import { PaginationDto } from '../../../pagination/pagination.dto';

/**
 * DTO for day creation
 */
export class CreateDayDto {

  @ApiProperty({
    format: 'YYYY-MM-DD'
  })
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
 * DTO for day query
 */
export class DayQueryDto {

  @ApiProperty({
    format: 'YYYY-MM-DD'
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => moment(value, 'YYYY-MM-DD').toDate())
  public readonly from: Date;

  @ApiProperty({
    format: 'YYYY-MM-DD'
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => moment(value, 'YYYY-MM-DD').toDate())
  public readonly to: Date;
}

/**
 * DTO for day query with pagination
 */
export class DaysQueryDto extends IntersectionType(DayQueryDto, PaginationDto) {}
