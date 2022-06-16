import { Body, Controller, Get, Param, Patch, Req, Res, StreamableFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UpdateAttachmentDto } from '../attachments/entities/attachment.dto';
import { Attachment } from '../attachments/entities/attachment.entity';
import { AttachmentService } from '../attachments/attachment.service';
import { IdToAttachmentPipe } from '../attachments/pipes/id-to-attachment.pipe';
import { DayService } from '../days/day.service';
import { AttachmentSelfAction } from '../hateoas/actions/attachment-self.action';
import { DayAttachmentsAction } from '../hateoas/actions/day-attachments.action';
import { DaySelfAction } from '../hateoas/actions/day-self.action';
import { UserSelfAction } from '../hateoas/actions/user-self.action';
import { HateoasService } from '../hateoas/hateoas.service';
import { UserService } from '../users/user.service';

/**
 * Attachment controller
 * 
 * Path: `/attachments`
 */
@ApiTags('attachments')
@Controller('attachments')
@UsePipes(ValidationPipe)
export class AttachmentController {

  private readonly attachmentService: AttachmentService;
  private readonly userService: UserService;
  private readonly dayService: DayService;
  private readonly hateoas: HateoasService;

  public constructor(attachmentsService: AttachmentService, userService: UserService, dayService: DayService, hateoas: HateoasService) {
    this.attachmentService = attachmentsService;
    this.userService = userService;
    this.dayService = dayService;
    this.hateoas = hateoas;
  }

  @Get(':id')
  public async findOne(@Req() req: Request, @Param('id', IdToAttachmentPipe) attachment: Attachment) {
    const day = await this.dayService.findOne(attachment.dayId);
    const user = await this.userService.findById(day.userId);
    attachment._links = this.hateoas.createActionBuilder(req)
      .add(new DayAttachmentsAction(day.formatedDate))
      .add(new DaySelfAction(user.username, day.formatedDate))
      .add(new UserSelfAction(user.username))
      .build();
    return {
      data: { attachment }
    };
  }

  @Get(':id/download')
  public async download(@Res({ passthrough: true }) res: Response, @Param('id', IdToAttachmentPipe) attachment: Attachment) {
    const stream = this.attachmentService.download(attachment);
    res.set({
      'Content-Disposition': `attachment; filename="${attachment.title || attachment.id}.${attachment.extension}"`
    });
    return new StreamableFile(stream);
  }

  @Patch(':id')
  public async update(@Req() req: Request, @Param('id', IdToAttachmentPipe) attachment: Attachment, @Body() dto: UpdateAttachmentDto) {
    await this.attachmentService.update(attachment, dto);
    const day = await this.dayService.findOne(attachment.dayId);
    const user = await this.userService.findById(day.userId);
    attachment._links = this.hateoas.createActionBuilder(req)
      .add(new AttachmentSelfAction(attachment.id))
      .add(new DayAttachmentsAction(day.formatedDate))
      .add(new DaySelfAction(user.username, day.formatedDate))
      .add(new UserSelfAction(user.username))
      .build();
    return { attachment };
  }
}
