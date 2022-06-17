import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

/**
 * DTO for user creation
 */
export class CreateUserDto {
  
  @ApiProperty({
    format: 'email'
  })
  @IsEmail()
  public readonly email: string;
  
  @ApiProperty({
    pattern: '^[a-zA-Z0-9]+$',
    minLength: 3,
    maxLength: 24
  })
  @Matches(/^[a-zA-Z0-9]+$/)
  @Length(3, 24)
  public readonly username: string; // TODO When updating username, check if the new username is valid

  @ApiProperty({
    minLength: 3,
    maxLength: 50
  })
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
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['googleId'])) {}
