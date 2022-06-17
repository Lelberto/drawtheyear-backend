import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PaginationPipe } from '../../pagination/pagination.pipe';
import { DayService } from '../days/day.service';
import { CreateDayDto, DaysQueryDto, UpdateDayDto } from '../days/entities/day.dto';
import { Day } from '../days/entities/day.entity';
import { DayQueryPipe } from '../days/pipes/day-query.pipe';
import { IdToDayPipe } from '../days/pipes/id-to-day.pipe';
import { ResolveDayIdPipe } from '../days/pipes/resolve-day-id.pipe';
import { ResolveDayPipe } from '../days/pipes/resolve-day.pipe';
import { EmotionService } from '../emotions/emotion.service';
import { Emotion } from '../emotions/entities/emotion.entity';
import { IdToEmotionPipe } from '../emotions/pipes/id-to-emotion.pipe';
import { DayEmotionsAction } from '../hateoas/actions/day-emotions.action';
import { DaySelfAction } from '../hateoas/actions/day-self.action';
import { EmotionSelfAction } from '../hateoas/actions/emotion-self.action';
import { UserSelfAction } from '../hateoas/actions/user-self.action';
import { HateoasService } from '../hateoas/hateoas.service';
import { User } from '../users/entities/user.entity';
import { UsernameToUserPipe } from '../users/pipes/username-to-user.pipe';

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
    return {
      data: {
        days: (await this.dayService.findByUser(user, query)).map(day => {
          day._links = this.hateoas.createActionBuilder(req)
            .add(new UserSelfAction(user.username))
            .add(new DayEmotionsAction(user.username, day.formatedDate))
            .build();
          return day;
        })
      }
    };
  }

  @Post()
  public async create(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Body() dto: CreateDayDto) {
    const day = await this.dayService.create(user, dto);
    day._links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(user.username, day.formatedDate))
      .add(new UserSelfAction(user.username))
      .build();
    return {
      data: { day }
    };
  }

  @Patch(':date')
  public async update(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day, @Body() body: UpdateDayDto) {
    await this.dayService.update(day, body);
    day._links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(user.username, day.formatedDate))
      .add(new UserSelfAction(user.username))
      .build();
    return { day };
  }

  @Delete(':date')
  @HttpCode(204)
  public async delete(@Param(ResolveDayPipe) day: Day) {
    await this.dayService.delete(day);
  }

  @Get(':date/emotions')
  public async findEmotions(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day) {
      return {
        data: {
          emotions: (await this.emotionService.findByDay(day)).map(emotion => {
            emotion._links = this.hateoas.createActionBuilder(req)
              .add(new EmotionSelfAction(emotion.id))
              .build();
            return emotion;
          })
        }
      };
  }

  @Put(':date/emotions/add/:emotionId')
  public async addEmotion(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day, @Param('emotionId', IdToEmotionPipe) emotion: Emotion) {
    await this.dayService.addEmotion(day, emotion);
    day._links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(user.id, day.formatedDate))
      .add(new UserSelfAction(user.username))
      .build();
    return { day };
  }

  @Put(':date/emotions/remove/:emotionId')
  public async removeEmotion(@Req() req: Request, @Param('username', UsernameToUserPipe) user: User, @Param(ResolveDayIdPipe, IdToDayPipe) day: Day, @Param('emotionId', IdToEmotionPipe) emotion: Emotion) {
    await this.dayService.removeEmotion(day, emotion);
    day._links = this.hateoas.createActionBuilder(req)
      .add(new DaySelfAction(user.id, day.formatedDate))
      .add(new UserSelfAction(user.username))
      .build();
    return { day };
  }
}
