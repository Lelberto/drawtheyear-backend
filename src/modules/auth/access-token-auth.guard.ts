import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Access token authentication guard
 * 
 * This guard uses the JWT strategy.
 */
@Injectable()
export class AccessTokenAuthGuard extends AuthGuard('access-token') {}
