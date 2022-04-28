import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Emotion } from './emotion.entity';

/**
 * Emotion repository
 */
@EntityRepository(Emotion)
export class EmotionRepository extends Repository<Emotion> {

  /**
   * Finds emotions by user.
   * 
   * @param userId User ID
   * @returns User's emotions
   */
  public async findByUser(userId: User['id']): Promise<Emotion[]> {
    return await this.find({ user: { id: userId } });
  }
}
