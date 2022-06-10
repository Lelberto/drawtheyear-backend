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
import { UsernameToUserPipe } from '../users/username-to-user.pipe';

/**
 * User day controller
 * 
 * Path : `/users/:username/days`
 */
@ApiTags('days')
@Controller('users/:username/days')
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
  public async find(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Query(PaginationPipe, DayQueryPipe) query: DaysQueryDto) {
    const links = this.hateoas.createActionBuilder(req)
      .add(new UserSelfAction(user.username))
      .build();
    return {
      data: { days: await this.dayService.findByUser(user.id, query) },
      links
    };
  }

  @Post()
  public async create(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Body() dto: CreateDayDto) {
    const day = await this.dayService.create(user.id, dto);
    const links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(user.username, day.formatedDate))
      .add(new UserDaysAction(user.username))
      .add(new UserSelfAction(user.username))
      .build();
    return {
      data: { day },
      links
    };
  }

  @Patch(':date')
  public async update(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day, @Body() body: UpdateDayDto) {
    await this.dayService.update(day.id, body);
    const links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(user.username, day.formatedDate))
      .add(new UserDaysAction(user.username))
      .add(new UserSelfAction(user.username))
      .build();
    return { links };
  }

  @Delete(':date')
  @HttpCode(204)
  public async delete(@Param(ResolveDayIdPipe) id: Day['id']) {
    await this.dayService.delete(id);
  }

  @Get(':date/emotions')
  public async findEmotions(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day) {
    const links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(user.id, day.formatedDate))
      .add(new UserDaysAction(user.username))
      .add(new UserSelfAction(user.username))
      .build();
    return {
      data: { emotions: await this.emotionService.findByDay(day.id) },
      links
    };
  }

  @Put(':date/emotions/add/:emotionId')
  public async addEmotion(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day, @Param('emotionId') emotionId: Emotion['id']) {
    await this.dayService.addEmotion(day.id, emotionId);
    const links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(user.id, day.formatedDate))
      .add(new UserDaysAction(user.username))
      .add(new UserSelfAction(user.username))
      .build();
    return { links };
  }

  @Put(':date/emotions/remove/:emotionId')
  public async removeEmotion(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day, @Param('emotionId') emotionId: Emotion['id']) {
    await this.dayService.removeEmotion(day.id, emotionId);
    const links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(user.id, day.formatedDate))
      .add(new UserDaysAction(user.username))
      .add(new UserSelfAction(user.username))
      .build();
    return { links };
  }
}
