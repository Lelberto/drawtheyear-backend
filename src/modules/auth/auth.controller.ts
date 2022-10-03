import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { RefreshTokenAuthGuard } from './guards/refresh-token-auth.guard';

@Controller('auth')
export class AuthController {

  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  public async googleAuth() {
    // Guard redirection to Google connection page
    // TODO Move this process to the frontend and keep only the google/callback route
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  public async googleRedirect(@Req() req: Request) {
    const data = {
      accessToken: await this.authService.generateAccessToken(req.user as User),
      refreshToken: await this.authService.generateRefreshToken(req.user as User)
    }
    return data;
  }

  @Post('accessToken')
  @UseGuards(RefreshTokenAuthGuard)
  public async accessToken(@Req() req: Request) {
    const data = {
      accessToken: await this.authService.generateAccessToken(req.user as User),
      refreshToken: await this.authService.generateRefreshToken(req.user as User)
    }
    return data;
  }
}
