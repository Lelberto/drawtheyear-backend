import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from '../../users/user.service';
import { DayService } from '../day.service';
import { Day } from '../entities/day.entity';

@Injectable()
export class ResolveDayDatePipe implements PipeTransform<{ username: string; dayDate: Date }, Promise<Day>> {

  private readonly dayService: DayService;
  private readonly userService: UserService;

  public constructor(dayService: DayService, userService: UserService) {
    this.dayService = dayService;
    this.userService = userService;
  }

  public async transform(value: { username: string; dayDate: Date }, metadata: ArgumentMetadata): Promise<Day> {
    return await this.dayService.findByDate(await this.userService.findByUsername(value.username), value.dayDate);
  }
}
