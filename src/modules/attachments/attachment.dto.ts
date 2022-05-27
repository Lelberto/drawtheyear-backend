import { IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * DTO for attachment update
 */
export class UpdateAttachmentDto {

  @IsOptional()
  @IsString()
  @MaxLength(30)
  public readonly title: string;
}
