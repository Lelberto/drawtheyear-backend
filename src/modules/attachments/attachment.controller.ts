import { Controller, Get, Param, Res, StreamableFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { Attachment } from './attachment.entity';
import { AttachmentService } from './attachment.service';
import { IdToAttachmentPipe } from './id-to-attachment.pipe';

/**
 * Attachment controller
 * 
 * Path: `/attachments`
 */
@Controller('attachments')
@UsePipes(ValidationPipe)
export class AttachmentController {

  private readonly attachmentService: AttachmentService;

  public constructor(attachmentsService: AttachmentService) {
    this.attachmentService = attachmentsService;
  }

  @Get(':id')
  @UseInterceptors(TransformInterceptor)
  public async findOne(@Param('id') id: Attachment['id']) {
    return { attachment: await this.attachmentService.findOne(id) };
  }

  // TODO WIP
  @Get(':id/download')
  public async download(@Res({ passthrough: true }) res: Response, @Param('id', IdToAttachmentPipe) attachment: Attachment) {
    console.log(attachment.path);
    const stream = createReadStream(attachment.path);
    stream.on('error', (err) => console.error('errrrr', err));
    stream.on('data', (chunk) => console.log('chunk', chunk));
    stream.on('end', () => console.log('end'));
    res.set({
      'Content-Type': attachment.mimetype,
      'Content-Disposition': `attachment; filename="${attachment.title || attachment.id}.${attachment.extension}"`,
      'Content-Length': stream.bytesRead,
    });
    return new StreamableFile(stream);
  }
}
