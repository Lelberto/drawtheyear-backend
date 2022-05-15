import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

/**
 * DTO for user creation
 */
export class CreateUserDto {
  
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  public readonly name: string;
}

/**
 * DTO for user update
 */
export class UpdateUserDto extends OmitType(CreateUserDto, []) {}
