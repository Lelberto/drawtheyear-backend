import { ApiProperty } from '@nestjs/swagger';
import { Day } from '../days/day.entity';
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

/**
 * Emotion entity
 */
@Entity()
export class Emotion extends BaseEntity {

  @ApiProperty({
    description: 'Emotion ID'
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  
  @ApiProperty({
    description: 'Emotion name'
  })
  @Column({
    type: 'varchar',
    length: 50
  })
  public name: string;

  @ApiProperty({
    description: 'Emotion color'
  })
  @Column({
    type: 'varchar',
    length: 7
  })
  public color: string;

  @ApiProperty({
    type: () => User,
    description: 'Emotion owner'
  })
  @ManyToOne(() => User, user => user.emotions)
  public user: User | User['id'];

  @ApiProperty({
    type: () => [Day],
    description: 'Emotion days'
  })
  @ManyToMany(() => Day, day => day.emotions)
  public days: Day[] | Day['id'][];
}
