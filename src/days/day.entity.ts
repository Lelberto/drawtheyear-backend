import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
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
    type: 'text',
    nullable: true
  })
  public description?: string;

  @Column({
    type: 'uuid'
  })
  public userId: User['id'];

  @ApiProperty({
    type: () => User,
    description: 'Day owner'
  })
  @ManyToOne(() => User, user => user.days)
  public user?: User;

  @ApiProperty({
    type: () => [Emotion],
    description: 'Day emotions'
  })
  @ManyToMany(() => Emotion, emotion => emotion.days, { cascade: true })
  @JoinTable()
  public emotions?: Emotion[];
}
