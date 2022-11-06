import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Permission } from '../../common/types/role.types';
import { RoleService } from '../auth/role.service';
import { Emotion } from '../emotions/entities/emotion.entity';
import { User } from '../users/entities/user.entity';
import { DayEmotionRepository } from './entities/day-emotion.repository';
import { CreateDayDto, UpdateDayDto } from './entities/day.dto';
import { Day } from './entities/day.entity';
import { DayRepository } from './entities/day.repository';
import { Place } from './entities/place.enum';
import { Visibility } from './entities/visibility.enum';

@Injectable()
export class DayService {

  private readonly dayRepo: DayRepository;
  private readonly dayEmotionRepo: DayEmotionRepository;
  private readonly roleService: RoleService;

  public constructor(dayRepo: DayRepository, dayEmotionRepo: DayEmotionRepository, roleService: RoleService) {
    this.dayRepo = dayRepo;
    this.dayEmotionRepo = dayEmotionRepo;
    this.roleService = roleService;
  }

  public async create(dto: CreateDayDto, user: User): Promise<Day> {
    if (await this.exists(user, dto.date)) {
      throw new BadRequestException(`Day with date ${dto.date} for user ${user.username} already exists`);
    }
    const day = this.dayRepo.create({ ...dto, user });
    return await this.dayRepo.save(day);
  }

  public async findByDate(user: User, date: Date): Promise<Day> {
    const day = await this.dayRepo.findByDate(user, date);
    if (!day) {
      throw new NotFoundException(`Day with date ${date} for user ${user.username} not found`);
    }
    return day;
  }

  public async findByYear(user: User, year: number): Promise<Day[]> {
    return await this.dayRepo.findByYear(user, year);
  }

  public async update(day: Day, dto: UpdateDayDto): Promise<void> {
    await this.dayRepo.save({ ...day, ...dto });
  }

  public async addEmotion(day: Day, emotion: Emotion, place = Place.END): Promise<void> {
    if (await this.dayEmotionExists(day, emotion)) {
      throw new BadRequestException(`Day ${day.date} already has emotion ${emotion.name}`);
    }
    const dayEmotion = this.dayEmotionRepo.create({ day, emotion, ordering: place === Place.START ? 0 : await this.countDayEmotions(day) });
    await this.dayEmotionRepo.save(dayEmotion);

    if (place === Place.START) {
      const dayEmotions = await this.dayEmotionRepo.findByDay(day);
      dayEmotions
        .filter(currentDayEmotion => currentDayEmotion.id !== dayEmotion.id)
        .forEach(currentDayEmotion => currentDayEmotion.ordering++);
      await this.dayEmotionRepo.save(dayEmotions);
    }
  }

  public async removeEmotion(day: Day, emotion: Emotion): Promise<void> {
    if (!await this.dayEmotionExists(day, emotion)) {
      throw new BadRequestException(`Day ${day.date} does not have emotion ${emotion.name}`);
    }
    const dayEmotion = await this.dayEmotionRepo.findByDayAndEmotion(day, emotion);
    await this.dayEmotionRepo.remove(dayEmotion);

    const dayEmotions = await this.dayEmotionRepo.findByDay(day);
    dayEmotions
      .filter(currentDayEmotion => currentDayEmotion.ordering > dayEmotion.ordering)
      .forEach(currentDayEmotion => currentDayEmotion.ordering--);
    await this.dayEmotionRepo.save(dayEmotions);
  }

  public async exists(user: User, date: Date): Promise<boolean> {
    return await this.dayRepo.countBy({ user: { id: user.id }, date }) > 0;
  }

  public async dayEmotionExists(day: Day, emotion: Emotion): Promise<boolean> {
    // TODO Faire pareil dans tous les services ({ user } devient { user: { id: user.id } })
    return await this.dayEmotionRepo.countBy({ day: { id: day.id }, emotion: { id: emotion.id } }) > 0;
  }

  public async countDayEmotions(day: Day): Promise<number> {
    return await this.dayEmotionRepo.countBy({ day: { id: day.id } });
  }

  public async hasAccessToDetails(day: Day, user: User): Promise<boolean> {
    return day.visibility === Visibility.PUBLIC
      || this.roleService.checkPermissions(user, Permission.DAY_DETAILS_BYPASS);
  }
}
