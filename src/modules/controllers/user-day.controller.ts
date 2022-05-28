import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { PaginationPipe } from '../../pagination/pagination.pipe';
import { DayQueryPipe } from '../days/day-query.pipe';
import { CreateDayDto, DaysQueryDto, UpdateDayDto } from '../days/day.dto';
import { Day } from '../days/day.entity';
import { DayService } from '../days/day.service';
import { ResolveDayIdPipe } from '../days/resolve-day-id.pipe';
import { Emotion } from '../emotions/emotion.entity';
import { EmotionService } from '../emotions/emotion.service';
import { DaySelfAction } from '../hateoas/actions/day-self.action';
import { UserDaysAction } from '../hateoas/actions/user-days.action';
import { HateoasService } from '../hateoas/hateoas.service';
import { User } from '../users/user.entity';

/**
 * User day controller
 * 
 * Path : `/users/:userId/days`
 */
@ApiTags('days')
@Controller('users/:userId/days')
@UseInterceptors(TransformInterceptor)
@UsePipes(ValidationPipe)
export class UserDayController {

  private readonly dayService: DayService;
  private readonly emotionService: EmotionService;
  private readonly hateoas: HateoasService;

  public constructor(dayService: DayService, emotionService: EmotionService, hateoas: HateoasService) {
    this.dayService = dayService;
    this.emotionService = emotionService;
    this.hateoas = hateoas;
  }

  @Get()
  public async find(@Param('userId') userId: User['id'], @Query(PaginationPipe, DayQueryPipe) query: DaysQueryDto) {
    return { days: await this.dayService.findByUser(userId, query) };
  }

  @Post()
  public async create(@Req() req: Request, @Param('userId') userId: User['id'], @Body() dto: CreateDayDto) {
    const day = await this.dayService.create(userId, dto);
    const links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(userId, day.formatedDate))
      .add(new UserDaysAction(userId))
      .build();
    return { day, links };
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
