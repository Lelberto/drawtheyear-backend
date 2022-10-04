import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DayModule } from '../days/day.module';
import { EmotionModule } from '../emotions/emotion.module';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth/auth.controller';
import { DayController } from './days/day.controller';
import { EmotionController } from './emotions/emotion.controller';
import { MeDaysController } from './users/me/me-days.controller';
import { MeEmotionsController } from './users/me/me-emotions.controller';
import { MeController } from './users/me/me.controller';
import { UserDayController } from './users/user-days.controller';
import { UserEmotionsController } from './users/user-emotions.controller';
import { UserController } from './users/user.controller';

@Module({
  imports: [AuthModule, UserModule, EmotionModule, DayModule],
  controllers: [
    AuthController,
    MeController,
    MeEmotionsController,
    MeDaysController,
    UserController,
    UserEmotionsController,
    UserDayController,
    EmotionController,
    DayController
  ]
})
export class ControllerModule {}
