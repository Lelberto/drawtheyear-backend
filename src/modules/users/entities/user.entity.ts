import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from '../../days/entities/day.entity';
import { Emotion } from '../../emotions/entities/emotion.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  public googleId: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: 16,
    unique: true
  })
  public username: string;

  @Column({
    type: 'varchar',
    length: '30'
  })
  public name: string;

  @OneToMany(() => Emotion, emotion => emotion.user)
  public emotions: Emotion[];

  @OneToMany(() => Day, day => day.user)
  public days: Day[];
}
