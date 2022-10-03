import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUsername } from '../../../common/decorators/validation/is-username.decorator';

export class CreateUserDto {

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsUsername()
  @IsNotEmpty()
  public username: string;

  @IsString()
  public googleId: string;
}
