import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../../utils/types';
import { AuthConfig } from '../config/auth';
import { UserService } from '../users/user.service';

/**
 * Access token passport strategy.
 * 
 * This strategy uses `passport-jwt`.
 */
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {

  private readonly userService: UserService;

  public constructor(configService: ConfigService, userService: UserService) {
    const config = configService.get<AuthConfig>('auth').jwt.accessToken;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secretKey
    });
    this.userService = userService;
  }

  /**
   * Validates the strategy
   * 
   * @param payload Access token payload
   * @returns Authenticated user
   */
  public async validate(payload: AccessTokenPayload) {
    return await this.userService.findById(payload.sub);
  }
}
