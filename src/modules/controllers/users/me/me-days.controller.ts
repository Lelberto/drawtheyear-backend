import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthUser } from '../../../../common/decorators/user.decorator';
import { AccessTokenAuthGuard } from '../../../auth/guards/access-token-auth.guard';
import { DayService } from '../../../days/day.service';
import { AddEmotionToDayDto, CreateDayDto, RemoveEmotionFromDayDto, UpdateDayDto } from '../../../days/entities/day.dto';
import { EmotionService } from '../../../emotions/emotion.service';
import { User } from '../../../users/entities/user.entity';

@Controller('me/days')
@UseGuards(AccessTokenAuthGuard)
export class MeDaysController {

  private readonly dayService: DayService;
  private readonly emotionService: EmotionService;

  public constructor(dayService: DayService, emotionService: EmotionService) {
    this.dayService = dayService;
    this.emotionService = emotionService;
  }

  @Post()
  public async create(@AuthUser() authUser: User, @Body() dto: CreateDayDto) {
    const day = await this.dayService.create(dto, authUser);
    return {
      date: day.date
    };
  }

  @Get()
  public async find(@AuthUser() authUser: User) {
    return await this.dayService.findByUser(authUser);
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
}
