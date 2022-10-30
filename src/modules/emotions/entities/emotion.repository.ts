import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Emotion } from './emotion.entity';

@Injectable()
export class EmotionRepository extends Repository<Emotion> {

  public constructor(dataSource: DataSource) {
    super(Emotion, dataSource.createEntityManager());
  }

  public async findByUser(user: User): Promise<Emotion[]> {
    return await this.createQueryBuilder()
      .relation(User, 'emotions')
      .of(user)
      .loadMany();
  }
}
