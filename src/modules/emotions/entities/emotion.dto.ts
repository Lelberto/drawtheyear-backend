import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsColor } from '../../../common/decorators/validation/is-color.decorator';

export class CreateEmotionDto {

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsColor()
  @IsNotEmpty()
  public color: string;
}

export class UpdateEmotionDto extends PartialType(CreateEmotionDto) {}
