import { Body, Controller, Get, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateDayDto } from './day.dto';
import { Day } from './day.entity';
import { DayService } from './day.service';
import { IdToDayPipe } from './id-to-day.pipe';

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
    return await this.dayService.find();
  }

  @Get(':id')
  public async findById(@Param('id', IdToDayPipe) day: Day) {
    return day;
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() body: UpdateDayDto) {
    await this.dayService.update(id, body);
  }
}
