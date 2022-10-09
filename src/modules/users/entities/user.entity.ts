import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from '../../days/entities/day.entity';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { Role } from './../../../common/types/role.types';

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
    type: 'tinyint',
    default: 0
  })
  @Exclude({ toPlainOnly: true })
  public usernameChangeCountToday: number;

  @Column({
    type: 'varchar',
    length: '30'
  })
  public name: string;

  @Column({
    // type: 'enum',
    type: 'varchar', length: 10, // TODO type: 'enum' don't work with SQLite
    enum: Object.values(Role),
    default: Role.USER
  })
  @Exclude({ toPlainOnly: true })
  public role: Role;

  @OneToMany(() => Emotion, emotion => emotion.user)
  public emotions: Emotion[];

  @OneToMany(() => Day, day => day.user)
  public days: Day[];
}
