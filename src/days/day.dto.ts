import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsDate, IsString } from 'class-validator';
import { Emotion } from 'src/emotions/emotion.entity';

/**
 * DTO for day creation
 */
export class CreateDayDto {

  @ApiProperty()
  @IsDate()
  public readonly date: Date;

  @ApiProperty()
  @IsString()
  public readonly description: string;

  @ApiProperty()
  @IsArray()
  public readonly emotions: Emotion['id'][];
}

/**
 * DTO for day update
 */
export class UpdateDayDto extends OmitType(CreateDayDto, []) {}
