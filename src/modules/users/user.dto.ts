import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

/**
 * DTO for user creation
 */
export class CreateUserDto {
  
  @ApiProperty()
  @IsEmail()
  public readonly email: string;
  
  @ApiProperty()
  @Matches(/^[a-zA-Z0-9]+$/)
  @Length(3, 24)
  public readonly username: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  public readonly name: string;

  @ApiProperty()
  @IsString()
  public readonly googleId: string;
}

/**
 * DTO for user update
 */
export class UpdateUserDto extends OmitType(CreateUserDto, []) {}
