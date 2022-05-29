import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * DTO for attachment update
 */
export class UpdateAttachmentDto {

  @ApiProperty({
    maxLength: 30
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  public readonly title: string;
}
