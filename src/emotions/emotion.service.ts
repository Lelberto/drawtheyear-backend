import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Day } from '../days/day.entity';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { CreateEmotionDto, UpdateEmotionDto } from './emotion.dto';
import { Emotion } from './emotion.entity';
import { EmotionRepository } from './emotion.repository';

/**
 * Emotions service
 */
@Injectable()
export class EmotionService {

  private readonly emotionRepo: EmotionRepository;
  private readonly userService: UserService;

  public constructor(emotionRepo: EmotionRepository, userService: UserService) {
    this.emotionRepo = emotionRepo;
    this.userService = userService;
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
    const emotion = this.emotionRepo.create({ ...dto, user: await this.userService.findById(userId) });
    await this.emotionRepo.save(emotion);
    return emotion;
  }

  /**
   * Finds emotions
   * 
   * @param ids Emotion IDs
   * @returns Emotions
   * @async
   */
  public async find(...ids: Emotion['id'][]): Promise<Emotion[]> {
    if (ids.length > 0) {
      if (!await this.exists(...ids)) {
        throw new EntityNotFoundError(Emotion, ids);
      }
      return await this.emotionRepo.findByIds(ids);
    }
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
  public async findOne(id: Emotion['id']): Promise<Emotion> {
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
