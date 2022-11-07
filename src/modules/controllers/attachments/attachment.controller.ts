import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentService } from '../../attachments/attachment.service';
import { Attachment } from '../../attachments/entities/attachment.entity';
import { ResolveAttachmentIdPipe } from '../../attachments/pipes/resolve-attachment-id.pipe';

@Controller('attachments')
export class AttachmentController {

  private readonly attachmentService: AttachmentService;

  public constructor(attachmentService: AttachmentService) {
    this.attachmentService = attachmentService;
  }

  @Get(':attachmentId')
  public async findById(@Param('attachmentId', ResolveAttachmentIdPipe) attachment: Attachment) {
    return {
      data: attachment
    };
  }

  @Post(':attachmentId/upload')
  @UseInterceptors(FileInterceptor('upload'))
  public async upload(@Param('attachmentId', ResolveAttachmentIdPipe) attachment: Attachment, @UploadedFile() file: Express.Multer.File) {
    // TODO Make the file storage system
  }
}
