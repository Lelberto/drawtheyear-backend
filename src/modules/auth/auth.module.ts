import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConfig } from '../config/auth';
import { UserModule } from '../users/user.module';
import { AccessTokenStrategy } from './access-token.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';

/**
 * Authentication module
 */
@Module({
  imports: [
    UserModule,
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
    })
  ],
  providers: [AuthService, AccessTokenStrategy, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
