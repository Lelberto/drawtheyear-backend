import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Local authentication guard
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
