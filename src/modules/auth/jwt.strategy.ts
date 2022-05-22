import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../../utils/types';
import { UserService } from '../users/user.service';

/**
 * JWT passport strategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_JWT_SECRET_KEY
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
