import { BadRequestException, Injectable } from '@nestjs/common';
import { remove } from 'lodash';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityNotFoundException } from '../../exceptions/entity.exception';
import { PaginationDto } from '../../pagination/pagination.dto';
import { Emotion } from '../emotions/entities/emotion.entity';
import { EmotionService } from '../emotions/emotion.service';
import { User } from '../users/entities/user.entity';
import { CreateDayDto, DaysQueryDto } from './entities/day.dto';
import { Day } from './entities/day.entity';
import { DayRepository } from './entities/day.repository';

/**
 * Days service
 */
@Injectable()
export class DayService {

  private readonly dayRepo: DayRepository;
  private readonly emotionService: EmotionService;

  public constructor(dayRepo: DayRepository, emotionService: EmotionService) {
    this.dayRepo = dayRepo;
    this.emotionService = emotionService;
  }

  /**
   * Resolves the day ID from an user ID and a day date
   * 
   * @param user User
   * @param date Day date
   * @returns Resolved day ID
   * @throws EntityNotFoundException If the day is not found
   * @async
   */
  public async resolveId(user: User, date: Day['date']): Promise<Day['id']> {
    const id = await this.dayRepo.resolveId(user.id, date);
    if (!id) {
      throw new EntityNotFoundException(Day);
    }
    return id;
  }

  /**
   * Creates a new day
   * 
   * @param user User
   * @param dto DTO
   * @returns Created day
   * @async
   */
  public async create(user: User, dto: CreateDayDto): Promise<Day> {
    const day = this.dayRepo.create({ ...dto, userId: user.id });
    await this.dayRepo.save(day);
    return day;
  }

  /**
   * Finds days
   * 
   * @param pagination Pagination
   * @returns Days
   * @async
   */
   public async find(pagination: PaginationDto): Promise<Day[]> {
    return await this.dayRepo.find({ skip: pagination.offset, take: pagination.limit });
  }

  /**
   * Finds one day
   * 
   * @param id Day ID
   * @returns Day
   * @throws EntityNotFoundException If the day is not found
   * @async
   */
  public async findOne(id: Day['id']): Promise<Day> {
    const day = await this.dayRepo.findOne({ id });
    if (!day) {
      throw new EntityNotFoundException(Day);
    }
    return day;
  }

  /**
   * Finds user's days
   * 
   * @param user User
   * @param query Query
   * @returns User's days
   * @async
   */
  public async findByUser(user: User, query: DaysQueryDto): Promise<Day[]> {
    return await this.dayRepo.findInterval(query.from, query.to, { userId: user.id, skip: query.offset, take: query.limit });
  }

  /**
   * Updates a day
   * 
   * @param day Day
   * @param dto DTO
   * @async
   */
  public async update(day: Day, data: QueryDeepPartialEntity<Day>): Promise<void> {
    await this.dayRepo.update({ id: day.id }, data);
  }

  /**
   * Adds an emotion to a day
   * 
   * @param day Day
   * @param emotion Emotion
   * @throws BadRequestException If the emotion is already included to the day
   * @async
   */
  public async addEmotion(day: Day, emotion: Emotion): Promise<void> {
    const emotions = await this.emotionService.findByDay(day);
    if (emotions.some(includedEmotion => includedEmotion.id === emotion.id)) {
      throw new BadRequestException('Emotion is already included to the day');
    }
    emotions.push(emotion);
    const updatedDay = await this.dayRepo.preload({ id: day.id, emotions });
    await this.dayRepo.save(updatedDay);
  }

  /**
   * Removes an emotion from a day
   * 
   * @param day Day
   * @param emotion Emotion
   * @throws BadRequestException If the emotion is not included to the day
   * @async
   */
  public async removeEmotion(day: Day, emotion: Emotion): Promise<void> {
    const emotions = await this.emotionService.findByDay(day);
    if (!emotions.some(includedEmotion => includedEmotion.id === emotion.id)) {
      throw new BadRequestException('Emotion is not included to the day');
    }
    remove(emotions, includedEmotion => includedEmotion.id === emotion.id);
    const updatedDay = await this.dayRepo.preload({ id: day.id, emotions });
    await this.dayRepo.save(updatedDay);
  }

  /**
   * Deletes a day
   * 
   * @param day Day
   * @async
   */
  public async delete(day: Day): Promise<void> {
    await this.dayRepo.delete({ id: day.id });
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
