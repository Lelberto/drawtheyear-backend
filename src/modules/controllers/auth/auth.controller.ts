import { Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthUser } from '../../../common/decorators/user.decorator';
import { AuthService } from '../../auth/auth.service';
import { GoogleAuthGuard } from '../../auth/guards/google-auth.guard';
import { RefreshTokenAuthGuard } from '../../auth/guards/refresh-token-auth.guard';
import { User } from '../../users/entities/user.entity';

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
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  public async googleRedirect(@AuthUser() authUser: User, @Query('state') state: string, @Res() res: Response) {
    const platform = new URLSearchParams(state).get('platform');
    const query = new URLSearchParams();
    query.append('accessToken', await this.authService.generateAccessToken(authUser));
    query.append('refreshToken', await this.authService.generateRefreshToken(authUser));
    return res.redirect(`${this.authService.resolvePlatformLoginSuccessUrl(platform)}?${query.toString()}`);
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
