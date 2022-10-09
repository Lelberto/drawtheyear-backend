import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { extractAuthUserFromRequest } from '../utils/utils';

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return extractAuthUserFromRequest(ctx.switchToHttp().getRequest<Request>());
});
