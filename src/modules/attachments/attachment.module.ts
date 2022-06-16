import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from '../storage/storage.module';
import { AttachmentStorageAdapter } from './attachment-storage.adapter';
import { Attachment } from './entities/attachment.entity';
import { AttachmentRepository } from './entities/attachment.repository';
import { AttachmentService } from './attachment.service';

/**
 * Attachment module
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment, AttachmentRepository]),
    StorageModule.register({ type: 'local' }), // TODO Implement async registration
  ],
  providers: [AttachmentService, AttachmentStorageAdapter],
  exports: [AttachmentService]
})
export class AttachmentModule {}
