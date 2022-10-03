import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../../../common/types/jwt.types';
import authConfig, { AuthConfig } from '../../config/auth.config';
import { UserService } from '../../users/user.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {

  private readonly userService: UserService;

  public constructor(userService: UserService, @Inject(authConfig.KEY) config: ConfigType<AuthConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.accessToken.secret
    });
    this.userService = userService;
  }

  public async validate(payload: AccessTokenPayload) {
    return await this.userService.findByEmail(payload.email);
  }
}
