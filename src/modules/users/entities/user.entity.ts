import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from '../../days/entities/day.entity';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { Hateoas } from '../../hateoas/hateoas.types';
import { Link } from '../../hateoas/hateoas.types';

/**
 * User entity
 */
@Entity()
export class User implements Hateoas {

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
    description: 'Username',
    pattern: '^[a-zA-Z0-9]+$',
    minLength: 3,
    maxLength: 24
  })
  @Column({
    type: 'varchar',
    unique: true,
    length: 24
  })
  public username: string;

  @ApiProperty({
    description: 'User email',
    format: 'email'
  })
  @Column({
    type: 'varchar',
    unique: true
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    minLength: 3,
    maxLength: 30
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

  @ApiProperty({
    type: () => [Day],
    description: 'User days'
  })
  @OneToMany(() => Day, day => day.user)
  public days?: Day[];

  public _links: Link[] = [];
}
