import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  public async googleRedirect() {
    const data = {
      accessToken: 'abcd',
      refreshToken: 'efgh'
    }
    return data;
  }
}
