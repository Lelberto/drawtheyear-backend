import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import * as moment from 'moment';
import { UsePermissions } from '../../../common/decorators/auth/use-permissions.decorator';
import { Permission } from '../../../common/types/role.types';
import { AttachmentService } from '../../attachments/attachment.service';
import { CreateAttachmentDto } from '../../attachments/entities/attachment.dto';
import { AccessTokenAuthGuard } from '../../auth/guards/jwt/access-token-auth.guard';
import { RoleGuard } from '../../auth/guards/roles/role.guard';
import { DayService } from '../../days/day.service';
import { AddEmotionToDayDto, CreateDayDto, FindDaysQueryDto, RemoveEmotionFromDayDto, UpdateDayDto } from '../../days/entities/day.dto';
import { Day } from '../../days/entities/day.entity';
import { DayDetailsInterceptor } from '../../days/interceptors/day-details.interceptor';
import { SortEmotionsInterceptor } from '../../days/interceptors/sort-emotions.interceptor';
import { ResolveDayDatePipe } from '../../days/pipes/resolve-day-date.pipe';
import { EmotionService } from '../../emotions/emotion.service';
import { User } from '../../users/entities/user.entity';
import { ResolveUsernamePipe } from '../../users/pipes/resolve-username.pipe';

@Controller('users/:username/days')
@UseGuards(AccessTokenAuthGuard, RoleGuard)
export class UserDayController {

  private readonly dayService: DayService;
  private readonly emotionService: EmotionService;
  private readonly attachmentService: AttachmentService;

  public constructor(dayService: DayService, emotionService: EmotionService, attachmentService: AttachmentService) {
    this.dayService = dayService;
    this.emotionService = emotionService;
    this.attachmentService = attachmentService;
  }

  @Post()
  @UsePermissions(Permission.DAY_CREATION)
  public async create(@Param('username', ResolveUsernamePipe) user: User, @Body() dto: CreateDayDto) {
    const day = await this.dayService.create(dto, user);
    return {
      date: day.date
    };
  }

  @Get()
  @UseInterceptors(DayDetailsInterceptor, SortEmotionsInterceptor)
  public async find(@Param('username', ResolveUsernamePipe) user: User, @Query() query: FindDaysQueryDto) {
    return {
      data: await this.dayService.findByYear(user, parseInt(query.year, 10) || moment().year())
    };
  }

  @Get(':dayDate')
  @UseInterceptors(DayDetailsInterceptor, SortEmotionsInterceptor)
  public async findByDate(@Param('username', ResolveUsernamePipe) user: User, @Param('dayDate') dayDate: Date) {
    return {
      data: await this.dayService.findByDate(user, dayDate)
    };
  }

  @Patch(':dayDate')
  @UsePermissions(Permission.DAY_UPDATE)
  public async update(@Param(ResolveDayDatePipe) day: Day, @Body() dto: UpdateDayDto) {
    await this.dayService.update(day, dto);
    return {
      date: day.date
    };
  }

  @Patch(':dayDate/emotions/add')
  @UsePermissions(Permission.DAY_UPDATE)
  public async addEmotion(@Param(ResolveDayDatePipe) day: Day, @Body() dto: AddEmotionToDayDto) {
    const emotion = await this.emotionService.findById(dto.emotionId);
    await this.dayService.addEmotion(day, emotion);
    return {
      date: day.date
    };
  }

  @Patch(':dayDate/emotions/remove')
  @UsePermissions(Permission.DAY_UPDATE)
  public async removeEmotion(@Param(ResolveDayDatePipe) day: Day, @Body() dto: RemoveEmotionFromDayDto) {
    const emotion = await this.emotionService.findById(dto.emotionId);
    await this.dayService.removeEmotion(day, emotion);
    return {
      date: day.date
    };
  }

  @Post(':dayDate/attachments')
  @UsePermissions(Permission.DAY_ATTACHMENT_CREATE)
  public async createAttachment(@Param('username', ResolveUsernamePipe) user: User, @Param('dayDate') dayDate: Date, @Body() dto: CreateAttachmentDto) {
    const day = await this.dayService.findByDate(user, dayDate);
    const attachment = await this.attachmentService.create(day, dto);
    return {
      id: attachment.id
    };
  }

  @Get(':dayDate/attachments')
  @UsePermissions(Permission.DAY_ATTACHMENT_VIEW)
  public async findAttachments(@Param('username', ResolveUsernamePipe) user: User, @Param('dayDate') dayDate: Date) {
    const day = await this.dayService.findByDate(user, dayDate);
    return {
      data: await this.attachmentService.findByDay(day)
    };
  }
}
