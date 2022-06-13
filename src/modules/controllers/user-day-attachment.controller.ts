import { Controller, Param, Post, Req, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AttachmentService } from '../attachments/attachment.service';
import { Day } from '../days/day.entity';
import { IdToDayPipe } from '../days/id-to-day.pipe';
import { ResolveDayIdPipe } from '../days/resolve-day-id.pipe';
import { AttachmentSelfAction } from '../hateoas/actions/attachment-self.action';
import { DayAttachmentsAction } from '../hateoas/actions/day-attachments.action';
import { DaySelfAction } from '../hateoas/actions/day-self.action';
import { UserSelfAction } from '../hateoas/actions/user-self.action';
import { HateoasService } from '../hateoas/hateoas.service';
import { User } from '../users/user.entity';
import { UsernameToUserPipe } from '../users/username-to-user.pipe';

/**
 * User day attachment controller
 * 
 * Path : `/users/:username/days/:date/attachments`
 */
@ApiTags('attachments')
@Controller('users/:username/days/:date/attachments')
@UsePipes(ValidationPipe)
export class UserDayAttachmentController {
  
  private readonly attachmentService: AttachmentService;
  private readonly hateoas: HateoasService;

  public constructor(attachmentService: AttachmentService, hateoas: HateoasService) {
    this.attachmentService = attachmentService;
    this.hateoas = hateoas;
  }

  @Post()
  @UseInterceptors(FileInterceptor('attachment'))
  public async uploadAttachment(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day, @UploadedFile() file: Express.Multer.File) {
    const attachment = await this.attachmentService.create(day.id, file);
    attachment._links = this.hateoas.createActionBuilder(req)
      .add(new AttachmentSelfAction(attachment.id))
      .add(new DayAttachmentsAction(day.formatedDate))
      .add(new DaySelfAction(user.username, day.formatedDate))
      .add(new UserSelfAction(user.username))
      .build();
    return {
      data: { attachment }
    };
  }
}
