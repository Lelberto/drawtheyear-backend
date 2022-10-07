import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import authConfig, { AuthConfig } from '../../config/auth.config';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  private readonly authService: AuthService;

  public constructor(authService: AuthService, @Inject(authConfig.KEY) config: ConfigType<AuthConfig>) {
    super({
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: 'http://localhost:8080/auth/google/callback', // TODO Put in config
      scope: ['email', 'profile']
    });
    this.authService = authService;
  }

  public async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<User> {
    return await this.authService.getUserFromGoogle(profile);
  }
}
