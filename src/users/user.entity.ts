import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Emotion } from '../emotions/emotion.entity';

/**
 * User entity
 */
@Entity()
export class User extends BaseEntity {

  @ApiProperty({
    description: 'User ID'
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'User name'
  })
  @Column({
    type: 'varchar',
    length: 30
  })
  public name: string;

  @ApiProperty({
    type: () => [Emotion],
    description: 'User emotions'
  })
  @OneToMany(() => Emotion, emotion => emotion.user)
  public emotions: Emotion[];
}
