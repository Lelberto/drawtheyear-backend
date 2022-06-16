import { Injectable } from '@nestjs/common';
import { EntityNotFoundException } from '../../global/exceptions/entity.exception';
import { PaginationDto } from '../../pagination/pagination.dto';
import { Day } from '../days/entities/day.entity';
import { User } from '../users/entities/user.entity';
import { CreateEmotionDto, UpdateEmotionDto } from './entities/emotion.dto';
import { Emotion } from './entities/emotion.entity';
import { EmotionRepository } from './entities/emotion.repository';

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
   * @param user User
   * @param dto DTO
   * @returns Created emotion
   * @async
   */
  public async create(user: User, dto: CreateEmotionDto): Promise<Emotion> {
    const emotion = this.emotionRepo.create({ ...dto, userId: user.id });
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
   * @throws EntityNotFoundException If the emotion is not found
   * @async
   */
  public async findOne(id: Emotion['id']): Promise<Emotion> {
    const emotion = await this.emotionRepo.findOne({ id });
    if (!emotion) {
      throw new EntityNotFoundException(Emotion);
    }
    return emotion;
  }

  /**
   * Finds user's emotions
   * 
   * @param user User
   * @returns User's emotions
   * @async
   */
  public async findByUser(user: User, pagination: PaginationDto): Promise<Emotion[]> {
    return await this.emotionRepo.findByUser(user.id, { skip: pagination.offset, take: pagination.limit });
  }

  /**
   * Finds day's emotions
   * 
   * @param day Day
   * @returns Day's emotions
   * @async
   */
  public async findByDay(day: Day): Promise<Emotion[]> {
    return await this.emotionRepo.findByDay(day.id);
  }

  /**
   * Updates an emotion
   * 
   * @param emotion Emotion
   * @param dto DTO
   * @async
   */
  public async update(emotion: Emotion, dto: UpdateEmotionDto): Promise<void> {
    await this.emotionRepo.update({ id: emotion.id }, dto);
  }

  /**
   * Deletes an emotion
   * 
   * @param emotion Emotion
   * @async
   */
  public async delete(emotion: Emotion): Promise<void> {
    await this.emotionRepo.delete({ id: emotion.id });
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
