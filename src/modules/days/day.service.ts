import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Emotion } from '../emotions/entities/emotion.entity';
import { User } from '../users/entities/user.entity';
import { CreateDayDto, UpdateDayDto } from './entities/day.dto';
import { Day } from './entities/day.entity';

@Injectable()
export class DayService {

  private readonly dayRepo: Repository<Day>;

  public constructor(@InjectRepository(Day) dayRepo: Repository<Day>) {
    this.dayRepo = dayRepo;
  }

  public async create(dto: CreateDayDto, user: User): Promise<Day> {
    if (await this.exists(user, dto.date)) {
      throw new BadRequestException(`Day with date ${dto.date} for user ${user.username} already exists`);
    }
    const day = this.dayRepo.create({ ...dto, user });
    return await this.dayRepo.save(day);
  }

  public async findByUser(user: User): Promise<Day[]> {
    return await this.dayRepo.find({ where: { user }, relations: { emotions: true } });
  }

  public async findByDate(user: User, date: Date): Promise<Day> {
    const day = await this.dayRepo.findOne({ where: { user, date }, relations: { emotions: true } });
    if (!day) {
      throw new NotFoundException(`Day with date ${date} for user ${user.username} not found`);
    }
    return day;
  }

  public async update(day: Day, dto: UpdateDayDto): Promise<void> {
    await this.dayRepo.save({ ...day, ...dto });
  }

  public async addEmotion(day: Day, emotion: Emotion): Promise<void> {
    day.emotions = [...day.emotions, emotion];
    await this.dayRepo.save(day);
  }

  public async removeEmotion(day: Day, emotion: Emotion): Promise<void> {
    day.emotions = day.emotions.filter(currentEmotion => currentEmotion.id !== emotion.id);
    await this.dayRepo.save(day);
  }

  public async exists(user: User, date: Date): Promise<boolean> {
    return await this.dayRepo.countBy({ user, date }) > 0;
  }
}
