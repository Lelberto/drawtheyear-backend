import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JWT passport strategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_JWT_SECRET_KEY
    });
  }

  public async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
