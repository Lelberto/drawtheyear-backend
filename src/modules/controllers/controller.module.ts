import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { EmotionModule } from '../emotions/emotion.module';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { EmotionController } from './emotion.controller';
import { UserController } from './user.controller';

@Module({
  imports: [AuthModule, UserModule, EmotionModule],
  controllers: [AuthController, UserController, EmotionController]
})
export class ControllerModule {}
