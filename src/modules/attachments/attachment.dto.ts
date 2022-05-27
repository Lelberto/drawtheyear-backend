import { IsOptional, IsString, Max } from 'class-validator';

/**
 * DTO for attachment creation
 */
export class CreateAttachmentDto {

  @IsOptional()
  @IsString()
  @Max(30)
  public readonly title: string;
}
