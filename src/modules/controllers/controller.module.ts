import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DayModule } from '../days/day.module';
import { EmotionModule } from '../emotions/emotion.module';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { DayController } from './day.controller';
import { EmotionController } from './emotion.controller';
import { MeDaysController } from './me-days.controller';
import { MeEmotionsController } from './me-emotions.controller';
import { MeController } from './me.controller';
import { UserDayController } from './user-days.controller';
import { UserEmotionsController } from './user-emotions.controller';
import { UserController } from './user.controller';

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
