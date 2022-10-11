import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { AccessTokenPayload, RefreshTokenPayload } from '../../common/types/jwt.types';
import appConfig, { AppConfig } from '../config/app.config';
import authConfig, { AuthConfig } from '../config/auth.config';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  
  private readonly userService: UserService;
  private readonly jwtService: JwtService;
  private readonly config: { auth: ConfigType<AuthConfig>; app: ConfigType<AppConfig> };

  public constructor(userService: UserService, jwtService: JwtService, @Inject(authConfig.KEY) config1: ConfigType<AuthConfig>, @Inject(appConfig.KEY) config2: ConfigType<AppConfig>) {
    this.userService = userService;
    this.jwtService = jwtService;
    this.config = { auth: config1, app: config2 };
  }

  public resolvePlatformLoginSuccessUrl(platform: string): string {
    const url = this.config.app.platforms[platform].loginCallback;
    if (!url) {
      throw new BadRequestException(`Invalid platform ${platform}`);
    }
    return url;
  }

  public async getUserFromGoogle(profile: Profile): Promise<User> {
    const { id, emails, displayName } = profile;
    if (await this.userService.exists({ googleId: id })) {
      return await this.userService.findByGoogleId(id);
    }
    return await this.userService.create({
      googleId: id,
      email: emails[0].value,
      username: await this.userService.generateUsername(displayName),
      name: displayName.substring(0, 30)
    });
  }

  public async generateAccessToken(user: User): Promise<string> {
    const payload: AccessTokenPayload = { sub: user.id, email: user.email };
    const { accessToken: accessTokenConfig } = this.config.auth;
    return await this.jwtService.signAsync(payload, {
      secret: accessTokenConfig.secret,
      expiresIn: accessTokenConfig.expiration
    });
  }

  public async generateRefreshToken(user: User): Promise<string> {
    const payload: RefreshTokenPayload = { sub: user.id, email: user.email };
    const { refreshToken: refreshTokenConfig } = this.config.auth;
    return await this.jwtService.signAsync(payload, {
      secret: refreshTokenConfig.secret,
      expiresIn: refreshTokenConfig.expiration
    });
  }
}
