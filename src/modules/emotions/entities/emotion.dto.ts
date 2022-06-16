import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsHexColor, IsString, Length } from 'class-validator';

/**
 * DTO for emotion creation
 */
export class CreateEmotionDto {
  
  @ApiProperty({
    minLength: 1,
    maxLength: 50
  })
  @IsString()
  @Length(1, 50)
  public readonly name: string;

  @ApiProperty({
    format: 'hex'
  })
  @IsHexColor()
  public readonly color: string;
}

/**
 * DTO for emotion update
 */
export class UpdateEmotionDto extends PartialType(CreateEmotionDto) {}
