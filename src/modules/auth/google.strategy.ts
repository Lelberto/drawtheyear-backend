import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthConfig } from '../config/auth';
import { AuthService } from './auth.service';

/**
 * Google passport strategy
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

  private readonly authService: AuthService;

  public constructor(configService: ConfigService, authService: AuthService) {
    const config = configService.get<AuthConfig>('auth').google;
    super({
      clientID: config.clientId,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackUrl,
      scope: ['profile', 'email']
    });
    this.authService = authService;
  }

  /**
   * Validates the strategy
   * 
   * @param accessToken Google access token
   * @param refreshToken Google refresh token
   * @param profile Google profile
   * @returns Authenticated user
   */
  public async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.createUserFromGoogle(profile);
    return user;
  }
}