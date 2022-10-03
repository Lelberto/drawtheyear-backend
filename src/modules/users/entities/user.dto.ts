import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsUsername } from '../../../common/decorators/validation/is-username.decorator';

export class CreateUserDto {

  @IsString()
  public googleId: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsUsername()
  @MaxLength(16)
  @IsNotEmpty()
  public username: string;

  @IsString()
  @MaxLength(30)
  public name: string;
}

export class UpdateUserDto extends PartialType(PickType(CreateUserDto, ['username', 'name'])) {}
