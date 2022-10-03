import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Day {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'date'
  })
  public date: Date;

  @Column({
    type: 'text'
  })
  public resume: string;

  @ManyToOne(() => User, user => user.days)
  public user: User;

  @ManyToMany(() => Emotion, emotion => emotion.days)
  @JoinTable()
  public emotions: Emotion[];
}
