import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { CreateDayDto } from './day.dto';
import { DayService } from './day.service';

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

  public constructor(dayService: DayService) {
    this.dayService = dayService;
  }

  @Get()
  public async find(@Param(':userId') userId: User['id']) {
    return await this.dayService.findByUser(userId);
  }

  @Post()
  public async create(@Param(':userId') userId: User['id'], @Body() dto: CreateDayDto) {
    return await this.dayService.create(userId, dto);
  }
}
