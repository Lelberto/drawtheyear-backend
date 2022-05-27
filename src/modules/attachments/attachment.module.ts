import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayRepository } from '../days/day.repository';
import { DayService } from '../days/day.service';
import { EmotionRepository } from '../emotions/emotion.repository';
import { EmotionService } from '../emotions/emotion.service';
import { StorageModule } from '../storage/storage.module';
import { UserRepository } from '../users/user.repository';
import { UserService } from '../users/user.service';
import { AttachmentStorageAdapter } from './attachment-storage.adapter';
import { AttachmentController } from './attachment.controller';
import { Attachment } from './attachment.entity';
import { AttachmentRepository } from './attachment.repository';
import { AttachmentService } from './attachment.service';

/**
 * Attachment module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment, AttachmentRepository, UserRepository, EmotionRepository, DayRepository]),
    StorageModule.register({ type: 'local' }) // TODO Implement async registration
  ],
  providers: [AttachmentService, AttachmentStorageAdapter, UserService, EmotionService, DayService],
  exports: [AttachmentStorageAdapter],
  controllers: [AttachmentController]
})
export class AttachmentModule {}
