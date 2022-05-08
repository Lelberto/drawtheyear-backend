import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Emotion } from '../emotions/emotion.entity';
import { User } from '../users/user.entity';

/**
 * Day entity
 */
@Entity()
export class Day {

  @ApiProperty({
    description: 'Day ID'
  })
  @PrimaryGeneratedColumn('uuid')
  @Exclude({ toPlainOnly: true })
  public id!: string;

  @ApiProperty({
    description: 'Day date'
  })
  @Column({
    type: 'date'
  })
  public date!: Date;

  @ApiProperty({
    description: 'Day description'
  })
  @Column({
    type: 'text',
    nullable: true
  })
  public description?: string;

  @ApiProperty({
    type: () => User,
    description: 'Day owner'
  })
  @ManyToOne(() => User, user => user.days, { eager: true })
  @Transform(({ value }) => value.id, { toPlainOnly: true })
  public user!: User;

  @ApiProperty({
    type: () => [Emotion],
    description: 'Day emotions'
  })
  @ManyToMany(() => Emotion, emotion => emotion.days, { eager: true, cascade: true })
  @JoinTable()
  @Transform(({ value }) => value.map(v => v.id), { toPlainOnly: true })
  public emotions?: Emotion[];
}
