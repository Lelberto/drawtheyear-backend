import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length } from 'class-validator';

/**
 * DTO for user creation
 */
export class CreateUserDto {
  @IsString()
  @Length(3, 30)
  public readonly name: string;
}

/**
 * DTO for user update
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
