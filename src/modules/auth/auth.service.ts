import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { AccessTokenPayload, RefreshTokenPayload } from '../../utils/types';
import { AuthConfig } from '../config/auth';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';

/**
 * Authentication service
 */
@Injectable()
export class AuthService {

  private readonly config: AuthConfig['jwt']['refreshToken'];
  private readonly userService: UserService;
  private readonly jwtService: JwtService;

  public constructor(configService: ConfigService, userService: UserService, jwtService: JwtService) {
    this.config = configService.get<AuthConfig>('auth').jwt.refreshToken;
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
      secret: this.config.secretKey,
      expiresIn: this.config.expiration
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
}
