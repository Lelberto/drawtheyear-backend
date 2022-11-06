import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Timestamps } from '../../../common/entities/timestamps.interface';
import { DayEmotion } from '../../days/entities/day-emotion.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Emotion implements Timestamps {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 30
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 7
  })
  public color: string;

  @ManyToOne(() => User, user => user.emotions)
  public user: User;

  @OneToMany(() => DayEmotion, dayEmotion => dayEmotion.emotion)
  public dayEmotions: DayEmotion[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
