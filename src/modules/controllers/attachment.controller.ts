import { Body, Controller, Get, Param, Patch, Req, Res, StreamableFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { UpdateAttachmentDto } from '../attachments/attachment.dto';
import { Attachment } from '../attachments/attachment.entity';
import { AttachmentService } from '../attachments/attachment.service';
import { IdToAttachmentPipe } from '../attachments/id-to-attachment.pipe';
import { DayService } from '../days/day.service';
import { AttachmentSelfAction } from '../hateoas/actions/attachment-self.action';
import { DayAttachmentsAction } from '../hateoas/actions/day-attachments.action';
import { DaySelfAction } from '../hateoas/actions/day-self.action';
import { UserSelfAction } from '../hateoas/actions/user-self.action';
import { HateoasService } from '../hateoas/hateoas.service';

/**
 * Attachment controller
 * 
 * Path: `/attachments`
 */
@Controller('attachments')
@UsePipes(ValidationPipe)
export class AttachmentController {

  private readonly attachmentService: AttachmentService;
  private readonly dayService: DayService;
  private readonly hateoas: HateoasService;

  public constructor(attachmentsService: AttachmentService, dayService: DayService, hateoas: HateoasService) {
    this.attachmentService = attachmentsService;
    this.dayService = dayService;
    this.hateoas = hateoas;
  }

  @Get(':id')
  @UseInterceptors(TransformInterceptor)
  public async findOne(@Req() req: Request, @Param('id', IdToAttachmentPipe) attachment: Attachment) {
    const day = await this.dayService.findOne(attachment.dayId);
    const links = this.hateoas.createActionBuilder(req)
      .add(new DayAttachmentsAction(day.formatedDate))
      .add(new DaySelfAction(day.userId, day.formatedDate))
      .add(new UserSelfAction(day.userId))
      .build();
    return { attachment, links };
  }

  @Get(':id/download')
  public async download(@Res({ passthrough: true }) res: Response, @Param('id', IdToAttachmentPipe) attachment: Attachment) {
    const stream = await this.attachmentService.download(attachment.id);
    res.set({
      'Content-Disposition': `attachment; filename="${attachment.title || attachment.id}.${attachment.extension}"`
    });
    return new StreamableFile(stream);
  }

  @Patch(':id')
  @UseInterceptors(TransformInterceptor)
  public async update(@Req() req: Request, @Param('id', IdToAttachmentPipe) attachment: Attachment, @Body() dto: UpdateAttachmentDto) {
    await this.attachmentService.update(attachment.id, dto);
    const day = await this.dayService.findOne(attachment.dayId);
    const links = this.hateoas.createActionBuilder(req)
      .add(new AttachmentSelfAction(attachment.id))
      .add(new DayAttachmentsAction(day.formatedDate))
      .add(new DaySelfAction(day.userId, day.formatedDate))
      .add(new UserSelfAction(day.userId))
      .build();
    return { links };
  }
}
