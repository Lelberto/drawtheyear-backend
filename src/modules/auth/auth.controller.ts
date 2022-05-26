import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';
import { JwtAuthGuard } from './access-token-auth.guard';

/**
 * Authentication controller
 * 
 * Path : `/auth`
 */
@Controller('auth')
export class AuthController {

  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('accessToken')
  // TODO Create refresh token system and guard
  public async accessToken(@Req() req: Request) {
    return this.authService.generateAccessToken(req.user as User);
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
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getProfile(@Req() req: Request) {
    return req.user;
  }
}
