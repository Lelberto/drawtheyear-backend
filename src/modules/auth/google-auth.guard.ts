import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Google authentication guard
 */
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}
