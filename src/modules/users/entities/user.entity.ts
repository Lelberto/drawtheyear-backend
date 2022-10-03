import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Emotion } from '../../emotions/entities/emotion.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: 16
  })
  public username: string;

  @OneToMany(() => Emotion, emotion => emotion.user)
  public emotions: Emotion[];
}
