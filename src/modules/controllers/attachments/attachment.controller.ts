import { Controller, Get, NotImplementedException, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
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
    const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
    await this.attachmentService.upload(attachment, file.buffer, extension, file.mimetype);
    return {
      id: attachment.id
    };
  }

  @Get(':attachmentId/download')
  public async download() {
    // FIXME This code causes a Node internal error
    // const data = await this.attachmentService.fetch(attachment);
    // res.set({
    //   'Content-Type': attachment.mimeType,
    //   'Content-Disposition': `attachment; filename=${attachment.name}.${attachment.extension}`
    // });
    // return res.send(data);
    throw new NotImplementedException('This endpoint is not available, use GET /attachments/:attachmentId/stream instead');
  }

  @Get(':attachmentId/stream')
  public async stream(@Res({ passthrough: true }) res: Response, @Param('attachmentId', ResolveAttachmentIdPipe) attachment: Attachment) {
    const stream = this.attachmentService.stream(attachment);
    res.set({
      'Content-Type': attachment.mimeType,
      'Content-Disposition': `attachment; filename=${attachment.name}.${attachment.extension}`
    });
    return new StreamableFile(stream);
  }
}
