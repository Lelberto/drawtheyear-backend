import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from '../days/day.entity';
import { Emotion } from '../emotions/emotion.entity';

/**
 * User entity
 */
@Entity()
export class User {

  @ApiProperty({
    description: 'User ID'
  })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({
    description: 'Google user ID'
  })
  @Column({
    type: 'varchar',
    unique: true
  })
  public googleId: string;

  @ApiProperty({
    description: 'User email'
  })
  @Column({
    type: 'varchar',
    unique: true
  })
  public email: string;

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
  public emotions?: Emotion[];

  @OneToMany(() => Day, day => day.user)
  public days?: Day[];
}
