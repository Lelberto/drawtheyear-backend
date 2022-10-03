import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DayService } from '../days/day.service';
import { CreateDayDto } from '../days/entities/day.dto';
import { Day } from '../days/entities/day.entity';
import { ResolveDayDatePipe } from '../days/pipes/resolve-day-date.pipe';
import { Emotion } from '../emotions/entities/emotion.entity';
import { ResolveEmotionIdPipe } from '../emotions/pipes/resolve-emotion-id.pipe';
import { User } from '../users/entities/user.entity';
import { ResolveUsernamePipe } from '../users/pipes/resolve-username.pipe';

@Controller('users/:username/days')
export class UserDayController {

  private readonly dayService: DayService;

  public constructor(dayService: DayService) {
    this.dayService = dayService;
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
  public async addEmotion(@Param(ResolveDayDatePipe) day: Day, @Body('emotionId', ResolveEmotionIdPipe) emotion: Emotion) {
    return await this.dayService.addEmotion(day, emotion);
  }

  @Patch(':dayDate/emotions/remove')
  public async removeEmotion(@Param(ResolveDayDatePipe) day: Day, @Body('emotionId', ResolveEmotionIdPipe) emotion: Emotion) {
    return await this.dayService.removeEmotion(day, emotion);
  }
}
