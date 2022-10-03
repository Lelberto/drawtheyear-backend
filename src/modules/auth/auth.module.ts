import { Module } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from '../config/auth.config';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        const { accessToken: accessTokenConfig } = config.get<ConfigType<AuthConfig>>('auth');
        // FIXME This configuration is reimplemented in the authentication service
        return {
          secret: accessTokenConfig.secret,
          signOptions: {
            expiresIn: accessTokenConfig.expiration
          }
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, GoogleStrategy, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
