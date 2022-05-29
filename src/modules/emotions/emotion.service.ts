import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../pagination/pagination.dto';
import { Day } from '../days/day.entity';
import { User } from '../users/user.entity';
import { CreateEmotionDto, UpdateEmotionDto } from './emotion.dto';
import { Emotion } from './emotion.entity';
import { EmotionRepository } from './emotion.repository';

/**
 * Emotions service
 */
@Injectable()
export class EmotionService {

  private readonly emotionRepo: EmotionRepository;

  public constructor(emotionRepo: EmotionRepository) {
    this.emotionRepo = emotionRepo;
  }

  /**
   * Creates a new emotion
   * 
   * @param userId User ID
   * @param dto DTO
   * @returns Created emotion
   * @async
   */
  public async create(userId: User['id'], dto: CreateEmotionDto): Promise<Emotion> {
    const emotion = this.emotionRepo.create({ ...dto, userId });
    await this.emotionRepo.save(emotion);
    return emotion;
  }

  /**
   * Finds emotions
   * 
   * @param pagination Pagination
   * @returns Emotions
   * @async
   */
  public async find(pagination: PaginationDto): Promise<Emotion[]> {
    return await this.emotionRepo.find({ skip: pagination.offset, take: pagination.limit });
  }

  /**
   * Finds an emotion
   * 
   * @param id Emotion ID
   * @returns Emotion
   * @throws NotFoundException If the emotion is not found
   * @async
   */
  public async findOne(id: Emotion['id']): Promise<Emotion> {
    return await this.emotionRepo.findOne({ id });
  }

  /**
   * Finds user's emotions
   * 
   * @param userId User ID
   * @returns User's emotions
   * @async
   */
  public async findByUser(userId: User['id'], pagination: PaginationDto): Promise<Emotion[]> {
    return await this.emotionRepo.findByUser(userId, { skip: pagination.offset, take: pagination.limit });
  }

  /**
   * Finds day's emotions
   * 
   * @param dayId Day ID
   * @returns Day's emotions
   * @async
   */
  public async findByDay(dayId: Day['id']): Promise<Emotion[]> {
    return await this.emotionRepo.findByDay(dayId);
  }

  /**
   * Updates an emotion
   * 
   * @param id Emotion ID
   * @param dto DTO
   * @async
   */
  public async update(id: Emotion['id'], dto: UpdateEmotionDto): Promise<void> {
    await this.emotionRepo.update({ id }, dto);
  }

  /**
   * Deletes an emotion
   * 
   * @param id Emotion ID
   * @async
   */
  public async delete(id: Emotion['id']): Promise<void> {
    await this.emotionRepo.delete({ id });
  }

  /**
   * Checks if emotion(s) exists
   * 
   * @param ids Emotion IDs
   * @returns True if the emotion(s) exists, false otherwise
   * @async
   */
   public async exists(...ids: Emotion['id'][]): Promise<boolean> {
    return await this.emotionRepo.exists(...ids);
  }
}
