import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
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
    const emotion = this.emotionRepo.create({ ...dto, user: { id: userId } });
    await this.emotionRepo.save(emotion);
    return emotion;
  }

  /**
   * Finds all emotions
   * 
   * @returns All emotions
   * @async
   */
  public async find(): Promise<Emotion[]> {
    return await this.emotionRepo.find();
  }

  /**
   * Finds an emotion
   * 
   * @param id Emotion ID
   * @returns Emotion
   * @throws NotFoundException If the emotion is not found
   * @async
   */
  public async findById(id: Emotion['id']): Promise<Emotion> {
    return await this.emotionRepo.findOneOrFail({ id });
  }

  /**
   * Finds user's emotions
   * 
   * @param userId User ID
   * @returns User's emotions
   * @async
   */
  public async findByUser(userId: User['id']): Promise<Emotion[]> {
    return await this.emotionRepo.findByUser(userId);
  }

  /**
   * Updates an emotion
   * 
   * @param id Emotion ID
   * @param dto DTO
   * @throws NotFoundException If the emotion is not found
   * @async
   */
  public async update(id: Emotion['id'], dto: UpdateEmotionDto): Promise<void> {
    if (!await this.exists(id)) {
      throw new EntityNotFoundError(Emotion, id);
    }
    await this.emotionRepo.update({ id }, dto);
  }

  /**
   * Deletes an emotion
   * 
   * @param id Emotion ID
   * @throws NotFoundException If the emotion is not found
   * @async
   */
  public async delete(id: Emotion['id']): Promise<void> {
    if (!await this.exists(id)) {
      throw new EntityNotFoundError(Emotion, id);
    }
    await this.emotionRepo.delete({ id });
  }

  /**
   * Checks if an emotion exists
   * 
   * @param id Emotion ID
   * @returns True if the emotion exists, false otherwise
   * @async
   */
   public async exists(id: User['id']): Promise<boolean> {
    return await this.emotionRepo.count({ id }) > 0;
  }
}
