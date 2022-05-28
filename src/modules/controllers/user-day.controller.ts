import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PaginationPipe } from '../../pagination/pagination.pipe';
import { DayQueryPipe } from '../days/day-query.pipe';
import { CreateDayDto, DaysQueryDto, UpdateDayDto } from '../days/day.dto';
import { Day } from '../days/day.entity';
import { DayService } from '../days/day.service';
import { IdToDayPipe } from '../days/id-to-day.pipe';
import { ResolveDayIdPipe } from '../days/resolve-day-id.pipe';
import { Emotion } from '../emotions/emotion.entity';
import { EmotionService } from '../emotions/emotion.service';
import { DaySelfAction } from '../hateoas/actions/day-self.action';
import { UserDaysAction } from '../hateoas/actions/user-days.action';
import { UserSelfAction } from '../hateoas/actions/user-self.action';
import { HateoasService } from '../hateoas/hateoas.service';
import { User } from '../users/user.entity';

/**
 * User day controller
 * 
 * Path : `/users/:userId/days`
 */
@ApiTags('days')
@Controller('users/:userId/days')
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
  public async find(@Req() req: Request, @Param('userId') userId: User['id'], @Query(PaginationPipe, DayQueryPipe) query: DaysQueryDto) {
    const links = this.hateoas.createActionBuilder(req)
      .add(new UserSelfAction(userId))
      .build();
    return {
      data: { days: await this.dayService.findByUser(userId, query) },
      links
    };
  }

  @Post()
  public async create(@Req() req: Request, @Param('userId') userId: User['id'], @Body() dto: CreateDayDto) {
    const day = await this.dayService.create(userId, dto);
    const links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(userId, day.formatedDate))
      .add(new UserDaysAction(userId))
      .add(new UserSelfAction(userId))
      .build();
    return {
      data: { day },
      links
    };
  }

  @Patch(':date')
  public async update(@Req() req: Request, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day, @Body() body: UpdateDayDto) {
    await this.dayService.update(day.id, body);
    const links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(day.userId, day.formatedDate))
      .add(new UserDaysAction(day.userId))
      .add(new UserSelfAction(day.userId))
      .build();
    return { links };
  }

  @Delete(':date')
  @HttpCode(204)
  public async delete(@Param(ResolveDayIdPipe) id: Day['id']) {
    await this.dayService.delete(id);
  }

  @Get(':date/emotions')
  public async findEmotions(@Req() req: Request, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day) {
    const links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(day.userId, day.formatedDate))
      .add(new UserDaysAction(day.userId))
      .add(new UserSelfAction(day.userId))
      .build();
    return {
      data: { emotions: await this.emotionService.findByDay(day.id) },
      links
    };
  }

  @Put(':date/emotions/add/:emotionId')
  public async addEmotion(@Req() req: Request, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day, @Param('emotionId') emotionId: Emotion['id']) {
    await this.dayService.addEmotion(day.id, emotionId);
    const links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(day.userId, day.formatedDate))
      .add(new UserDaysAction(day.userId))
      .add(new UserSelfAction(day.userId))
      .build();
    return { links };
  }

  @Put(':date/emotions/remove/:emotionId')
  public async removeEmotion(@Req() req: Request, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day, @Param('emotionId') emotionId: Emotion['id']) {
    await this.dayService.removeEmotion(day.id, emotionId);
    const links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(day.userId, day.formatedDate))
      .add(new UserDaysAction(day.userId))
      .add(new UserSelfAction(day.userId))
      .build();
    return { links };
  }
}
