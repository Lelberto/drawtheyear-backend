import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import * as moment from 'moment';
import { AuthUser } from '../../../../common/decorators/user.decorator';
import { AttachmentService } from '../../../attachments/attachment.service';
import { CreateAttachmentDto } from '../../../attachments/entities/attachment.dto';
import { AccessTokenAuthGuard } from '../../../auth/guards/jwt/access-token-auth.guard';
import { DayService } from '../../../days/day.service';
import { AddEmotionToDayDto, CreateDayDto, FindDaysQueryDto, RemoveEmotionFromDayDto, UpdateDayDto } from '../../../days/entities/day.dto';
import { SortEmotionsInterceptor } from '../../../days/interceptors/sort-emotions.interceptor';
import { EmotionService } from '../../../emotions/emotion.service';
import { User } from '../../../users/entities/user.entity';

@Controller('me/days')
@UseGuards(AccessTokenAuthGuard)
export class MeDaysController {

  private readonly dayService: DayService;
  private readonly emotionService: EmotionService;
  private readonly attachmentService: AttachmentService;

  public constructor(dayService: DayService, emotionService: EmotionService, attachmentService: AttachmentService) {
    this.dayService = dayService;
    this.emotionService = emotionService;
    this.attachmentService = attachmentService;
  }

  @Post()
  public async create(@AuthUser() authUser: User, @Body() dto: CreateDayDto) {
    const day = await this.dayService.create(dto, authUser);
    return {
      date: day.date
    };
  }

  @Get()
  @UseInterceptors(SortEmotionsInterceptor)
  public async find(@AuthUser() authUser: User, @Query() query: FindDaysQueryDto): Promise<{ data: import("d:/Development/drawtheyear/drawtheyear-backend/src/modules/days/entities/day.entity").Day[]; }> {
    return {
      data: await this.dayService.findByYear(authUser, parseInt(query.year, 10) || moment().year())
    };
  }

  @Get(':dayDate')
  @UseInterceptors(SortEmotionsInterceptor)
  public async findByDate(@AuthUser() authUser: User, @Param('dayDate') dayDate: Date) {
    return {
      data: await this.dayService.findByDate(authUser, dayDate)
    };
  }

  @Patch(':dayDate')
  public async update(@AuthUser() authUser: User, @Param('dayDate') dayDate: Date, @Body() dto: UpdateDayDto) {
    const day = await this.dayService.findByDate(authUser, dayDate);
    await this.dayService.update(day, dto);
    return {
      date: day.date
    };
  }

  @Patch(':dayDate/emotions/add')
  public async addEmotion(@AuthUser() authUser: User, @Param('dayDate') dayDate: Date, @Body() dto: AddEmotionToDayDto) {
    const emotion = await this.emotionService.findById(dto.emotionId);
    const day = await this.dayService.findByDate(authUser, dayDate);
    await this.dayService.addEmotion(day, emotion);
    return {
      date: day.date
    };
  }

  @Patch(':dayDate/emotions/remove')
  public async removeEmotion(@AuthUser() authUser: User, @Param('dayDate') dayDate: Date, @Body() dto: RemoveEmotionFromDayDto) {
    const emotion = await this.emotionService.findById(dto.emotionId);
    const day = await this.dayService.findByDate(authUser, dayDate);
    await this.dayService.removeEmotion(day, emotion);
    return {
      date: day.date
    };
  }

  @Post(':dayDate/attachments')
  public async createAttachment(@AuthUser() authUser: User, @Param('dayDate') dayDate: Date, @Body() dto: CreateAttachmentDto) {
    const day = await this.dayService.findByDate(authUser, dayDate);
    const attachment = await this.attachmentService.create(day, dto);
    return {
      id: attachment.id
    };
  }

  @Get(':dayDate/attachments')
  public async findAttachments(@AuthUser() authUser: User, @Param('dayDate') dayDate: Date) {
    const day = await this.dayService.findByDate(authUser, dayDate);
    return {
      data: await this.attachmentService.findByDay(day)
    };
  }
}
