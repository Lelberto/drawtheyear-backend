import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { DayEmotion } from './day-emotion.entity';
import { Day } from './day.entity';

@Injectable()
export class DayEmotionRepository extends Repository<DayEmotion> {

  public constructor(dataSource: DataSource) {
    super(DayEmotion, dataSource.createEntityManager());
  }

  public async findByDay(day: Day): Promise<DayEmotion[]> {
    return await this.createQueryBuilder('de')
      .where('de.day_id = :dayId', { dayId: day.id })
      .getMany();
  }

  public async findByDayAndEmotion(day: Day, emotion: Emotion): Promise<DayEmotion> {
    return await this.createQueryBuilder('de')
      .where('de.day_id = :dayId', { dayId: day.id })
      .andWhere('de.emotion_id = :emotionId', { emotionId: emotion.id })
      .getOne();
  }
}
