import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Permission } from '../../common/types/role.types';
import { RoleService } from '../auth/role.service';
import { Emotion } from '../emotions/entities/emotion.entity';
import { User } from '../users/entities/user.entity';
import { CreateDayDto, UpdateDayDto } from './entities/day.dto';
import { Day } from './entities/day.entity';
import { Visibility } from './entities/visibility.enum';

@Injectable()
export class DayService {

  private readonly dayRepo: Repository<Day>;
  private readonly roleService: RoleService;

  public constructor(@InjectRepository(Day) dayRepo: Repository<Day>, roleService: RoleService) {
    this.dayRepo = dayRepo;
    this.roleService = roleService;
  }

  public async create(dto: CreateDayDto, user: User): Promise<Day> {
    if (await this.exists(user, dto.date)) {
      throw new BadRequestException(`Day with date ${dto.date} for user ${user.username} already exists`);
    }
    const day = this.dayRepo.create({ ...dto, user });
    return await this.dayRepo.save(day);
  }

  public async findByUser(user: User, caller: User): Promise<Day[]> {
    const days = await this.dayRepo.findBy({ user });
    return days.map(day => {
      if (!this.hasAccessToDetails(day, caller)) {
        day.resume = null;
      }
      return day;
    });
  }

  public async findByDate(user: User, date: Date): Promise<Day> {
    const day = await this.dayRepo.findOneBy({ user });
    if (!day) {
      throw new NotFoundException(`Day with date ${date} for user ${user.username} not found`);
    }
    return day;
  }

  public async findByYear(user: User, year: number): Promise<Day[]> {
    const dates = [moment(`${year}-01-01`), moment(`${year}-12-31`)];
    return (await this.findByUser(user, user)).filter(day => moment(day.date).isBetween(dates[0], dates[1]));
  }

  public async update(day: Day, dto: UpdateDayDto): Promise<void> {
    await this.dayRepo.save({ ...day, ...dto });
  }

  public async addEmotion(day: Day, emotion: Emotion): Promise<void> {
    day.emotions = day.emotions ? [...day.emotions, emotion] : [emotion];
    await this.dayRepo.save(day);
  }

  public async removeEmotion(day: Day, emotion: Emotion): Promise<void> {
    day.emotions = day.emotions?.filter(currentEmotion => currentEmotion.id !== emotion.id);
    await this.dayRepo.save(day);
  }

  public async exists(user: User, date: Date): Promise<boolean> {
    return await this.dayRepo.countBy({ user, date }) > 0;
  }

  public async hasAccessToDetails(day: Day, user: User): Promise<boolean> {
    return day.visibility === Visibility.PUBLIC
      || user?.id === day.user as unknown as string
      || this.roleService.checkPermissions(user, Permission.DAY_RESUME_BYPASS);
  }
}
