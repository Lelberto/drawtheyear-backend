import { Body, Controller, Get, Param, Patch, Res, StreamableFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { UpdateAttachmentDto } from './attachment.dto';
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

  @Get(':id/download')
  public async download(@Res({ passthrough: true }) res: Response, @Param('id', IdToAttachmentPipe) attachment: Attachment) {
    const stream = createReadStream(attachment.path);
    res.set({
      'Content-Disposition': `attachment; filename="${attachment.title || attachment.id}.${attachment.extension}"`
    });
    return new StreamableFile(stream);
  }

  @Patch(':id')
  @UseInterceptors(TransformInterceptor)
  public async update(@Param('id') id: Attachment['id'], @Body() dto: UpdateAttachmentDto) {
    await this.attachmentService.update(id, dto);
  }
}
