import { Controller, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { AttachmentService } from '../attachments/attachment.service';
import { Day } from '../days/day.entity';
import { ResolveDayIdPipe } from '../days/resolve-day-id.pipe';

/**
 * User day attachment controller
 * 
 * Path : `/users/:userId/days/:date/attachments`
 */
@Controller('users/:userId/days/:date/attachments')
@UseInterceptors(TransformInterceptor)
@UsePipes(ValidationPipe)
export class UserDayAttachmentController {
  
  private readonly attachmentService: AttachmentService;

  public constructor(attachmentService: AttachmentService) {
    this.attachmentService = attachmentService;
  }

  @Post()
  @UseInterceptors(FileInterceptor('attachment'))
  public async uploadAttachment(@Param(ResolveDayIdPipe) id: Day['id'], @UploadedFile() file: Express.Multer.File) {
    return { attachment: await this.attachmentService.create(id, file) };
  }
}
