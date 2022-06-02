import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';

/**
 * Google authentication guard
 */
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {

  public getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions<any> {
    const req = context.switchToHttp().getRequest();
    const platform = req.query.platform;
    return platform ? { state: `platform=${platform}` } : {};
  }
}
