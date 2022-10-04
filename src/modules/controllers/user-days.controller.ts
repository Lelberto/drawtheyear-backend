import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DayService } from '../days/day.service';
import { AddEmotionToDayDto, CreateDayDto, RemoveEmotionFromDayDto } from '../days/entities/day.dto';
import { Day } from '../days/entities/day.entity';
import { ResolveDayDatePipe } from '../days/pipes/resolve-day-date.pipe';
import { EmotionService } from '../emotions/emotion.service';
import { User } from '../users/entities/user.entity';
import { ResolveUsernamePipe } from '../users/pipes/resolve-username.pipe';

@Controller('users/:username/days')
export class UserDayController {

  private readonly dayService: DayService;
  private readonly emotionService: EmotionService;

  public constructor(dayService: DayService, emotionService: EmotionService) {
    this.dayService = dayService;
    this.emotionService = emotionService;
  }

  @Post()
  public async create(@Param('username', ResolveUsernamePipe) user: User, @Body() dto: CreateDayDto) {
    return await this.dayService.create(dto, user);
  }

  @Get()
  public async find(@Param('username', ResolveUsernamePipe) user: User) {
    return await this.dayService.findByUser(user);
  }

  @Patch(':dayDate/emotions/add')
  public async addEmotion(@Param(ResolveDayDatePipe) day: Day, @Body() dto: AddEmotionToDayDto) {
    const emotion = await this.emotionService.findById(dto.emotionId);
    return await this.dayService.addEmotion(day, emotion);
  }

  @Patch(':dayDate/emotions/remove')
  public async removeEmotion(@Param(ResolveDayDatePipe) day: Day, @Body() dto: RemoveEmotionFromDayDto) {
    const emotion = await this.emotionService.findById(dto.emotionId);
    return await this.dayService.removeEmotion(day, emotion);
  }
}
