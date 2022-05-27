import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayRepository } from '../days/day.repository';
import { DayService } from '../days/day.service';
import { EmotionRepository } from '../emotions/emotion.repository';
import { EmotionService } from '../emotions/emotion.service';
import { UserRepository } from '../users/user.repository';
import { UserService } from '../users/user.service';
import { AttachmentController } from './attachment.controller';
import { Attachment } from './attachment.entity';
import { AttachmentRepository } from './attachment.repository';
import { AttachmentService } from './attachment.service';

/**
 * Attachment module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Attachment, AttachmentRepository, UserRepository, EmotionRepository, DayRepository])],
  providers: [AttachmentService, UserService, EmotionService, DayService],
  controllers: [AttachmentController]
})
export class AttachmentModule {}
