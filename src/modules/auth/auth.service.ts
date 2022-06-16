import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { AccessTokenPayload, RefreshTokenPayload } from '../../utils/types';
import { AuthConfig } from '../config/auth';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';

/**
 * Authentication service
 */
@Injectable()
export class AuthService {

  private readonly config: AuthConfig;
  private readonly userService: UserService;
  private readonly jwtService: JwtService;

  public constructor(configService: ConfigService, userService: UserService, jwtService: JwtService) {
    this.config = configService.get('auth');
    this.userService = userService;
    this.jwtService = jwtService;
  }

  /**
   * Generates a new access token for the given user
   * 
   * @param user User for payload
   * @returns Access token
   */
  public async generateAccessToken(user: User) {
    const payload: AccessTokenPayload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  /**
   * Generates a new refresh token for the given user
   * 
   * @param user User for payload
   * @returns Refresh token
   */
  public async generateRefreshToken(user: User) {
    const payload: RefreshTokenPayload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload, {
      secret: this.config.jwt.refreshToken.secretKey,
      expiresIn: this.config.jwt.refreshToken.expiration
    });
  }

  /**
   * Gets an user from a google profile
   * 
   * This method will create the user if he doesn't exist.
   * 
   * @param profile Google profile
   * @returns User
   */
  public async getUserFromGoogle(profile: Profile) {
    const { id, emails, displayName } = profile;
    const user = await this.userService.findByGoogleId(id);
    return user || await this.userService.create({
      googleId: id,
      email: emails[0].value,
      username: await this.userService.generateUsername(displayName),
      name: displayName
    });
  }

  /**
   * Gets the callback URL from a specified platform
   * 
   * A platform callback URL is not an OAuth2 callback URL. This is just the URL of the specified
   * platform used by the `AuthController` to make redirections after user logged in with success.
   * 
   * @param platform DTY platform
   * @returns Callback URL of the platform, or `null` if the platform is not supported
   */
  public getCallbackUrl(platform: string) {
    const url = this.config.platformCallbackUrls[platform];
    return url ? `${this.config.platformCallbackUrls[platform]}` : null;
  }
}
