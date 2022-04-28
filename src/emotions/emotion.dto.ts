import { PartialType } from '@nestjs/mapped-types';
import { IsHexColor, IsString, Length } from 'class-validator';

/**
 * DTO for emotion creation
 */
export class CreateEmotionDto {
  @IsString()
  @Length(1, 50)
  public readonly name: string;

  @IsHexColor()
  public readonly color: string;
}

/**
 * DTO for emotion update
 */
export class UpdateEmotionDto extends PartialType(CreateEmotionDto) {}
