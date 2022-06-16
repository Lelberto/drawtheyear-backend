import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Refresh token authentication guard
 * 
 * This guard uses the JWT strategy.
 */
@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard('refresh-token') {}
