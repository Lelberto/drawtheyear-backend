import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import moment from 'moment';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attachment } from '../../attachments/entities/attachment.entity';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { Hateoas } from '../../hateoas/hateoas.types';
import { Link } from '../../hateoas/hateoas.types';
import { User } from '../../users/entities/user.entity';

/**
 * Day entity
 */
@Entity()
export class Day implements Hateoas {

  @ApiProperty({
    description: 'Day ID'
  })
  @PrimaryGeneratedColumn('uuid')
  @Exclude({ toPlainOnly: true })
  public id: string;

  @ApiProperty({
    description: 'Day date',
    format: 'YYYY-MM-DD'
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

  @OneToMany(() => Attachment, attachment => attachment.day)
  public attachments?: Attachment[];

  public _links: Link[] = [];

  /** Returns day date in format `YYYY-MM-DD` */
  public get formatedDate(): string {
    return moment(this.date).format('YYYY-MM-DD');
  }
}
