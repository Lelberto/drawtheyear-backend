import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { EmotionService } from '../emotions/emotion.service';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { CreateDayDto, UpdateDayDto, UpdateDayEmotionsDto } from './day.dto';
import { Day } from './day.entity';
import { DayRepository } from './day.repository';

/**
 * Days service
 */
@Injectable()
export class DayService {

  private readonly dayRepo: DayRepository;
  private readonly userService: UserService;
  private readonly emotionService: EmotionService;

  public constructor(dayRepo: DayRepository, userService: UserService, emotionService: EmotionService) {
    this.dayRepo = dayRepo;
    this.userService = userService;
    this.emotionService = emotionService;
  }

  /**
   * Resolves the day ID from an user ID and a day date
   * 
   * @param userId User ID
   * @param date Day date
   * @returns Resolved day ID
   * @async
   */
  public async resolveId(userId: User['id'], date: Day['date']): Promise<Day['id']> {
    return this.dayRepo.resolveId(userId, date);
  }

  /**
   * Creates a new day
   * 
   * @param userId User ID
   * @param dto DTO
   * @returns Created day
   * @async
   */
  public async create(userId: User['id'], dto: CreateDayDto): Promise<Day> {
    const day = this.dayRepo.create({
      user: await this.userService.findById(userId),
      ...dto
    });
    await this.dayRepo.save(day);
    return day;
  }

  /**
   * Finds days
   * 
   * @param ids Day ID(s)
   * @returns Days
   * @async
   */
   public async find(...ids: Day['id'][]): Promise<Day[]> {
     if (ids.length > 0) {
      if (!await this.exists(...ids)) {
        throw new EntityNotFoundError(Day, ids);
      }
      return await this.dayRepo.findByIds(ids);
    }
    return await this.dayRepo.find();
  }

  /**
   * Finds one day
   * 
   * @param id Day ID
   * @returns Day
   * @throws NotFoundException If the day is not found
   * @async
   */
  public async findOne(id: Day['id']): Promise<Day> {
    return await this.dayRepo.findOneOrFail({ id });
  }

  /**
   * Finds user's days
   * 
   * @param userId User ID
   * @returns User's days
   * @async
   */
  public async findByUser(userId: string): Promise<Day[]> {
    return await this.dayRepo.findByUser(userId);
  }

  /**
   * Updates a day
   * 
   * @param id Day ID
   * @param dto DTO
   * @throws NotFoundException If the user or day are not found
   * @async
   */
  public async update(id: Day['id'], dto: UpdateDayDto): Promise<void> {
    if (!await this.exists(id)) {
      throw new EntityNotFoundError(Day, id);
    }
    await this.dayRepo.update({ id }, dto);
  }

  /**
   * Updates a day
   * 
   * @param id Day ID
   * @param dto DTO
   * @throws NotFoundException If the user or day are not found
   * @async
   */
  public async updateEmotions(id: Day['id'], dto: UpdateDayEmotionsDto): Promise<void> {
    if (!await this.exists(id)) {
      throw new EntityNotFoundError(Day, id);
    }
    const day = await this.dayRepo.findOne(id);
    day.emotions = await this.emotionService.find(...dto.emotions);
    await this.dayRepo.save(day);
  }

  /**
   * Deletes a day
   * 
   * @param id Day ID
   * @throws NotFoundException If the day is not found
   * @async
   */
  public async delete(id: Day['id']): Promise<void> {
    if (!await this.exists(id)) {
      throw new EntityNotFoundError(Day, id);
    }
    await this.dayRepo.delete({ id });
  }

  /**
   * Checks if day(s) exists
   * 
   * @param ids Day IDs
   * @returns True if the day(s) exists, false otherwise
   * @async
   */
   public async exists(...ids: Day['id'][]): Promise<boolean> {
    return await this.dayRepo.exists(...ids);
  }
}
