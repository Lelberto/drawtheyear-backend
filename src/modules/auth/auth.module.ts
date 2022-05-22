import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from '../config/auth';
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
        const config = configService.get<AuthConfig>('auth').jwt;
        return {
          secret: config.secretKey,
          signOptions: { expiresIn: config.expiration }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
