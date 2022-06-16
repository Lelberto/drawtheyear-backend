import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { GoogleAuthGuard } from '../auth/google/guards/google-auth.guard';
import { RefreshTokenAuthGuard } from '../auth/jwt/guards/refresh-token-auth.guard';
import { User } from '../users/entities/user.entity';

/**
 * Authentication controller
 * 
 * Path : `/auth`
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {

  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('accessToken')
  @UseGuards(RefreshTokenAuthGuard)
  public async accessToken(@Req() req: Request) {
    return {
      data: {
        access_token: await this.authService.generateAccessToken(req.user as User),
        refresh_token: await this.authService.generateRefreshToken(req.user as User)
      }
    };
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  public async googleAuth() {
    // Guard redirection to Google connection page
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  public async redirect(@Req() req: Request, @Res() res: Response) {
    const platform = (req.query?.state as string).split('=')[1];
    const platformCallbackUrl = this.authService.getCallbackUrl(platform as string);
    const data = {
      access_token: await this.authService.generateAccessToken(req.user as User),
      refresh_token: await this.authService.generateRefreshToken(req.user as User)
    }
    return platformCallbackUrl
      ? res.redirect(`${platformCallbackUrl}?accessToken=${data.access_token}&refreshToken=${data.refresh_token}`)
      : { data };
  }
}
