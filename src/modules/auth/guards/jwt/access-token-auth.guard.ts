import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenAuthGuard extends AuthGuard('access-token') {

  public handleRequest<User>(err: any, user: User): User {
    if (err || !user) {
      throw new UnauthorizedException('Invalid access token');
    }
    return user;
  }
}
