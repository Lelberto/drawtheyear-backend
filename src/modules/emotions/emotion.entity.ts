import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from '../days/day.entity';
import { Hateoas } from '../hateoas/hateoas.interface';
import { Link } from '../hateoas/hateoas.types';
import { User } from '../users/user.entity';

/**
 * Emotion entity
 */
@Entity()
export class Emotion implements Hateoas {

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
    description: 'Emotion color',
    format: 'hex'
  })
  @Column({
    type: 'varchar',
    length: 7
  })
  public color: string;

  @Column({
    type: 'uuid'
  })
  public userId: User['id'];

  @ApiProperty({
    type: () => User,
    description: 'Emotion owner'
  })
  @ManyToOne(() => User, user => user.emotions)
  public user?: User;

  @ApiProperty({
    type: () => [Day],
    description: 'Emotion days'
  })
  @ManyToMany(() => Day, day => day.emotions)
  public days?: Day[];

  public _links: Link[] = [];
}
