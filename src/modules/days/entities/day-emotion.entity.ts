import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { Day } from './day.entity';

@Entity()
export class DayEmotion {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @PrimaryColumn('uuid')
  public dayId: string;

  @ManyToOne(() => Day, day => day.dayEmotions)
  public day: Day;

  @PrimaryColumn('uuid')
  public emotionId: string;

  @ManyToOne(() => Emotion, emotion => emotion.dayEmotions)
  public emotion: Emotion;

  @Column({
    type: 'tinyint'
  })
  public ordering: number;
}
