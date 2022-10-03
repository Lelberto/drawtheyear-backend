import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  public async googleAuth() {
    // Guard redirection to Google connection page
    // TODO Move this process to the frontend and keep only the google/callback route
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  public async googleRedirect(@Req() req: Request) {
    const data = {
      accessToken: await this.authService.generateAccessToken(req.user as User),
      refreshToken: await this.authService.generateRefreshToken(req.user as User)
    }
    return data;
  }

  @Post('accessToken')
  @UseGuards(AuthGuard('refresh-token'))
  public async accessToken(@Req() req: Request) {
    const data = {
      accessToken: await this.authService.generateAccessToken(req.user as User),
      refreshToken: await this.authService.generateRefreshToken(req.user as User)
    }
    return data;
  }
}
