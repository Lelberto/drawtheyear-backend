import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Timestamps } from '../../../common/entities/timestamps.interface';
import { Attachment } from '../../attachments/entities/attachment.entity';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { User } from '../../users/entities/user.entity';
import { DayEmotion } from './day-emotion.entity';
import { Visibility } from './visibility.enum';

@Entity()
export class Day implements Timestamps {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'date'
  })
  public date: Date;

  @Column({
    type: 'text',
    nullable: true
  })
  public resume: string;

  @Column({
    // type: 'enum',
    type: 'varchar', length: 10, // TODO type: 'enum' don't work with SQLite
    enum: Object.values(Visibility),
    default: Visibility.PRIVATE
  })
  public visibility: Visibility;

  @ManyToOne(() => User, user => user.days)
  public user: User;

  @OneToMany(() => DayEmotion, dayEmotion => dayEmotion.day)
  @Exclude({ toPlainOnly: true })
  public dayEmotions: DayEmotion[];

  public emotions: Emotion[];

  @OneToMany(() => Attachment, attachment => attachment.day)
  public attachments: Attachment[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
