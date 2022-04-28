import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Emotion } from '../emotions/emotion.entity';

/**
 * User entity
 */
@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 30
  })
  public name: string;

  @OneToMany(() => Emotion, emotion => emotion.user)
  public emotions: Emotion[];
}
