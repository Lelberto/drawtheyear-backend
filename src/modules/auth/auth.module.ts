import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConfig } from '../config/auth';
import { UserModule } from '../users/user.module';
import { AccessTokenStrategy } from './jwt/strategies/access-token.strategy';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google/strategies/google.strategy';
import { RefreshTokenStrategy } from './jwt/strategies/refresh-token.strategy';

/**
 * Authentication module
 */
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const config = configService.get<AuthConfig>('auth').jwt.accessToken;
        return {
          secret: config.secretKey,
          signOptions: { expiresIn: config.expiration }
        };
      },
      inject: [ConfigService]
    }),
    UserModule
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
