import { Injectable, PipeTransform } from '@nestjs/common';
import { Attachment } from '../entities/attachment.entity';
import { AttachmentService } from '../attachment.service';

/**
 * ID to attachment pipe
 * 
 * Used to transform an attachment ID to the corresponding attachment.
 */
@Injectable()
export class IdToAttachmentPipe implements PipeTransform<string, Promise<Attachment>> {

  private readonly attachmentService: AttachmentService;

  public constructor(emotionService: AttachmentService) {
    this.attachmentService = emotionService;
  }

  public async transform(id: string): Promise<Attachment> {
    return await this.attachmentService.findOne(id);
  }
}
