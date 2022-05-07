import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
    type: 'text'
  })
  public description: string;

  @Column({
    type: 'uuid'
  })
  public userId!: string;

  @ApiProperty({
    type: () => User,
    description: 'Day owner'
  })
  @ManyToOne(() => User, user => user.days)
  public user?: User | User['id'];

  @ApiProperty({
    type: () => [Emotion],
    description: 'Day emotions'
  })
  @ManyToMany(() => Emotion, emotion => emotion.days)
  public emotions?: Emotion[] | Emotion['id'][];
}
