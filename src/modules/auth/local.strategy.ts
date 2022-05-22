import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

/**
 * Local password strategy
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    super({
      usernameField: 'email'
    });
    this.authService = authService;
  }

  public async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
