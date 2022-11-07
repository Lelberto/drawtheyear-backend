import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentStorageAdapter } from './attachment-storage-adapter';
import { AttachmentService } from './attachment.service';
import { Attachment } from './entities/attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  exports: [AttachmentService],
  providers: [AttachmentService, AttachmentStorageAdapter]
})
export class AttachmentModule {}
