import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {

  public getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions<any> {
    const platform = context.switchToHttp().getRequest().query.platform;
    return platform ? { state: `platform=${platform}` } : {};
  }
}
