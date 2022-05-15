import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmotionModule } from '../emotions/emotion.module';
import { EmotionRepository } from '../emotions/emotion.repository';
import { HateoasModule } from '../hateoas/hateoas.module';
import { UserModule } from '../users/user.module';
import { UserRepository } from '../users/user.repository';
import { DayByUserController } from './day-by-user.controller';
import { DayController } from './day.controller';
import { Day } from './day.entity';
import { DayRepository } from './day.repository';
import { DayService } from './day.service';

/**
 * Day module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Day, DayRepository, UserRepository, EmotionRepository]),
    UserModule,
    EmotionModule,
    HateoasModule
  ],
  providers: [DayService],
  controllers: [DayController, DayByUserController]
})
export class DayModule {}
