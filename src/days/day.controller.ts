import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DayService } from './day.service';

/**
 * Day controller
 * 
 * Path : `/days`
 */
@ApiTags('days')
@Controller('days')
@UsePipes(ValidationPipe)
export class DayController {

  private readonly dayService: DayService;

  public constructor(dayService: DayService) {
    this.dayService = dayService;
  }

  @Get()
  public async find() {
    return { days: await this.dayService.find() };
  }
}
