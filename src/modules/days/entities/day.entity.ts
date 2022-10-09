import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { User } from '../../users/entities/user.entity';


export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private'
}
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

  @Column({
    // type: 'enum',
    type: 'varchar', length: 10, // TODO type: 'enum' don't work with SQLite
    enum: Object.values(Visibility),
    default: Visibility.PRIVATE
  })
  public visibility: Visibility;

  @ManyToOne(() => User, user => user.days)
  public user: User;

  @ManyToMany(() => Emotion, emotion => emotion.days)
  @JoinTable()
  public emotions: Emotion[];
}
