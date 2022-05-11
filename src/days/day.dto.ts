import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsSpecificDate } from '../decorators/is-specific-date.decorator';
import { Emotion } from '../emotions/emotion.entity';

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
