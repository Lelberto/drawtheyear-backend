import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsUsername } from '../../../common/decorators/validation/is-username.decorator';
import { Role } from '../../../common/types/role.types';

export class CreateUserDto {

  @IsString()
  public googleId?: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsUsername()
  @MaxLength(16)
  @IsNotEmpty()
  public username: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public picture?: string;
}

export class UpdateUserDto extends PartialType(PickType(CreateUserDto, ['username', 'name'])) {}

export class ChangeRoleDto {
  
  @IsEnum(Role)
  @IsNotEmpty()
  public role: Role;
}
