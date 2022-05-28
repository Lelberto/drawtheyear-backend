import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayModule } from '../days/day.module';
import { StorageModule } from '../storage/storage.module';
import { AttachmentStorageAdapter } from './attachment-storage.adapter';
import { Attachment } from './attachment.entity';
import { AttachmentRepository } from './attachment.repository';
import { AttachmentService } from './attachment.service';

/**
 * Attachment module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment, AttachmentRepository]),
    StorageModule.register({ type: 'local' }), // TODO Implement async registration
    DayModule
  ],
  providers: [AttachmentService, AttachmentStorageAdapter],
  exports: [AttachmentService]
})
export class AttachmentModule {}
