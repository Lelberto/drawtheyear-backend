import { ApiProperty } from '@nestjs/swagger';
import { Emotion } from 'src/emotions/emotion.entity';
import { User } from 'src/users/user.entity';
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Day entity
 */
@Entity()
export class Day extends BaseEntity {

  @ApiProperty({
    description: 'Day ID'
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'Day date'
  })
  @Column({
    type: 'date'
  })
  public date: Date;

  @ApiProperty({
    description: 'Day description'
  })
  @Column({
    type: 'text'
  })
  public description: string;

  @ApiProperty({
    type: () => User,
    description: 'Day owner'
  })
  @ManyToOne(() => User, user => user.days)
  public user: User | User['id'];

  @ApiProperty({
    type: () => [Emotion],
    description: 'Day emotions'
  })
  @ManyToMany(() => Emotion, emotion => emotion.days)
  public emotions: Emotion[] | Emotion['id'][];
}
