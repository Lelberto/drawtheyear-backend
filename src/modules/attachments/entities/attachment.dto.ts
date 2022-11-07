import { IsString, MaxLength } from 'class-validator';

export class CreateAttachmentDto {

  @IsString()
  @MaxLength(30)
  public name: string;
}
