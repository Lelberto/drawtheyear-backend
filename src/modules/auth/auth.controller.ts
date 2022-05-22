import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

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
  public async accessToken(@Req() req: Request) {
    return this.authService.accessToken(req.user as User);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  public async googleAuth() {
    // Guard redirection
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  public async redirect(@Req() req: Request) {
    return req.user;
  }

  // TODO Remove this endpoint
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getProfile(@Req() req: Request) {
    return req.user;
  }
}
