import { Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../users/user.entity';
import { AuthService } from '../auth/auth.service';
import { GoogleAuthGuard } from '../auth/google-auth.guard';
import { AccessTokenAuthGuard } from '../auth/access-token-auth.guard';
import { RefreshTokenAuthGuard } from '../auth/refresh-token-auth.guard';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';

/**
 * Authentication controller
 * 
 * Path : `/auth`
 */
@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {

  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('accessToken')
  @UseGuards(RefreshTokenAuthGuard)
  public async accessToken(@Req() req: Request) {
    return {
      access_token: await this.authService.generateAccessToken(req.user as User),
      refresh_token: await this.authService.generateRefreshToken(req.user as User)
    };
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  public async googleAuth() {
    // Guard redirection
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  public async redirect(@Req() req: Request) {
    return {
      access_token: await this.authService.generateAccessToken(req.user as User),
      refresh_token: await this.authService.generateRefreshToken(req.user as User)
    };
  }

  // TODO Remove this endpoint
  @UseGuards(AccessTokenAuthGuard)
  @Get('profile')
  public async getProfile(@Req() req: Request) {
    return req.user;
  }
}
