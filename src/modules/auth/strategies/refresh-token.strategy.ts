import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenPayload } from '../../../common/types/jwt.types';
import authConfig, { AuthConfig } from '../../config/auth.config';
import { UserService } from '../../users/user.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {

  private readonly userService: UserService;

  public constructor(userService: UserService, @Inject(authConfig.KEY) config: ConfigType<AuthConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: config.refreshToken.secret
    });
    this.userService = userService;
  }

  public async validate(payload: RefreshTokenPayload) {
    return await this.userService.findByEmail(payload.email);
  }
}
