import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { User } from '../users/user.entity';
import { CreateDayDto, UpdateDayDto } from './day.dto';
import { Day } from './day.entity';
import { DayRepository } from './day.repository';

/**
 * Days service
 */
@Injectable()
export class DayService {

  private readonly dayRepo: DayRepository;

  public constructor(dayRepo: DayRepository) {
    this.dayRepo = dayRepo;
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
    const day = this.dayRepo.create({...dto, user: { id: userId }});
    await this.dayRepo.save(day);
    return day;
  }

  /**
   * Finds all days
   * 
   * @returns All days
   * @async
   */
   public async find(): Promise<Day[]> {
    return await this.dayRepo.find();
  }

  /**
   * Finds a day
   * 
   * @param id Day ID
   * @returns Day
   * @throws NotFoundException If the day is not found
   * @async
   */
  public async findById(id: Day['id']): Promise<Day> {
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
   * @throws NotFoundException If the day is not found
   * @async
   */
  public async update(id: Day['id'], dto: UpdateDayDto): Promise<void> {
    if (!await this.exists(id)) {
      throw new EntityNotFoundError(Day, id);
    }
    await this.dayRepo.update({ id }, dto);
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
   * Checks if a day exists
   * 
   * @param id Day ID
   * @returns True if the day exists, false otherwise
   * @async
   */
   public async exists(id: User['id']): Promise<boolean> {
    return await this.dayRepo.count({ id }) > 0;
  }
}
