import { IsString } from 'class-validator';

export class CreateEmotionDto {
  @IsString()
  public name: string;

  @IsString()
  public color: string;
}