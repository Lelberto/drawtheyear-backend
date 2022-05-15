import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emotion } from './emotion.entity';
import { EmotionService } from './emotion.service';
import { EmotionController } from './emotion.controller';
import { EmotionRepository } from './emotion.repository';
import { EmotionByUserController } from './emotion-by-user.controller';
import { HateoasModule } from '../hateoas/hateoas.module';
import { UserModule } from '../users/user.module';

/**
 * Emotion module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Emotion, EmotionRepository]),
    UserModule,
    HateoasModule
  ],
  providers: [EmotionService],
  controllers: [EmotionController, EmotionByUserController],
  exports: [EmotionService]
})
export class EmotionModule {}
