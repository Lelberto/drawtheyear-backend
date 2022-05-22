import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT authentication guard
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
