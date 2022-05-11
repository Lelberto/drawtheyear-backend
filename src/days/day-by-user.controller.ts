import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Emotion } from '../emotions/emotion.entity';
import { EmotionService } from '../emotions/emotion.service';
import { HateoasService } from '../hateoas/hateoas.service';
import { User } from '../users/user.entity';
import { CreateDayDto, UpdateDayDto } from './day.dto';
import { Day } from './day.entity';
import { DayService } from './day.service';
import { ResolveDayIdPipe } from './resolve-day-id.pipe';

/**
 * Day by user controller
 * 
 * Path : `/users/:userId/days`
 */
@ApiTags('days')
@Controller('users/:userId/days')
@UsePipes(ValidationPipe)
export class DayByUserController {

  private readonly dayService: DayService;
  private readonly emotionService: EmotionService;
  private readonly hateoas: HateoasService;

  public constructor(dayService: DayService, emotionService: EmotionService, hateoas: HateoasService) {
    this.dayService = dayService;
    this.emotionService = emotionService;
    this.hateoas = hateoas;
  }

  @Get()
  public async find(@Param('userId') userId: User['id']) {
    return { days: await this.dayService.findByUser(userId) };
  }

  @Post()
  public async create(@Req() req: Request, @Param('userId') userId: User['id'], @Body() dto: CreateDayDto) {
    const day = await this.dayService.create(userId, dto);
    return {
      day,
      links: [
        this.hateoas.createLink(req, 'day-self', { userId, dayDate: day.date }),
        this.hateoas.createLink(req, 'user-days', { userId }),
      ]
    };
  }

  @Patch(':date')
  public async update(@Param(ResolveDayIdPipe) id: Day['id'], @Body() body: UpdateDayDto) {
    await this.dayService.update(id, body);
  }

  @Delete(':date')
  @HttpCode(204)
  public async delete(@Param(ResolveDayIdPipe) id: Day['id']) {
    await this.dayService.delete(id);
  }

  @Get(':date/emotions')
  public async findEmotions(@Param(ResolveDayIdPipe) id: Day['id']) {
    return { emotions: await this.emotionService.findByDay(id) };
  }

  @Put(':date/emotions/add/:emotionId')
  public async addEmotion(@Param(ResolveDayIdPipe) id: Day['id'], @Param('emotionId') emotionId: Emotion['id']) {
    await this.dayService.addEmotion(id, emotionId);
  }

  @Put(':date/emotions/remove/:emotionId')
  public async removeEmotion(@Param(ResolveDayIdPipe) id: Day['id'], @Param('emotionId') emotionId: Emotion['id']) {
    await this.dayService.removeEmotion(id, emotionId);
  }
}
