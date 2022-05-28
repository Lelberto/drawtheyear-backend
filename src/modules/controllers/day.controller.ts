import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DayService } from '../days/day.service';

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
}
