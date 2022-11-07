import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AttachmentService } from '../attachment.service';
import { Attachment } from '../entities/attachment.entity';

@Injectable()
export class ResolveAttachmentIdPipe implements PipeTransform<string, Promise<Attachment>> {

  private readonly attachmentService: AttachmentService;

  public constructor(attachmentService: AttachmentService) {
    this.attachmentService = attachmentService;
  }

  public async transform(value: string, metadata: ArgumentMetadata): Promise<Attachment> {
    return await this.attachmentService.findById(value);
  }
}
