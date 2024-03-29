import { Controller, Get, Inject, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthUser } from '../../../common/decorators/user.decorator';
import { AuthService } from '../../auth/auth.service';
import { GoogleAuthGuard } from '../../auth/guards/oauth/google-auth.guard';
import { RefreshTokenAuthGuard } from '../../auth/guards/jwt/refresh-token-auth.guard';
import { User } from '../../users/entities/user.entity';
import { ConfigType } from '@nestjs/config';
import authConfig, { AuthConfig } from '../../config/auth.config';

@Controller('auth')
export class AuthController {

  private readonly authService: AuthService;
  private readonly config: ConfigType<AuthConfig>;

  public constructor(authService: AuthService, @Inject(authConfig.KEY) config: ConfigType<AuthConfig>) {
    this.authService = authService;
    this.config = config;
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  public async googleAuth() {
    // Guard redirection to Google connection page
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  public async googleRedirect(@AuthUser() authUser: User, @Query('state') state: string, @Res({ passthrough: true }) res: Response) {
    const platform = new URLSearchParams(state).get('platform');
    const accessToken = await this.authService.generateAccessToken(authUser);
    const refreshToken = await this.authService.generateRefreshToken(authUser);
    if (platform) {
      const query = new URLSearchParams();
      query.append('accessToken', accessToken);
      query.append('refreshToken', refreshToken);
      return res.redirect(`${this.authService.resolvePlatformLoginSuccessUrl(platform)}?${query.toString()}`);
    }
    return { accessToken, refreshToken };
  }

  @Post('accessToken')
  @UseGuards(RefreshTokenAuthGuard)
  public async accessToken(@Req() req: Request) {
    return {
      accessToken: await this.authService.generateAccessToken(req.user as User),
      refreshToken: await this.authService.generateRefreshToken(req.user as User),
      timestamp: Date.now(),
      expiration: this.config.accessToken.expiration * 1000
    };
  }
}
