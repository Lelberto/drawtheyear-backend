import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard('refresh-token') {

  public handleRequest<User>(err: any, user: User): User {
    if (err || !user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return user;
  }
}
