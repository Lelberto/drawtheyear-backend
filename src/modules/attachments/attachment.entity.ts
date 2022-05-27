import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from '../days/day.entity';

/**
 * Attachment entity
 */
@Entity()
export class Attachment {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar'
  })
  @Exclude({ toPlainOnly: true })
  public path: string;

  @Column({
    type: 'varchar',
    length: 5
  })
  public extension: string;

  @Column({
    type: 'varchar',
    length: 20
  })
  public mimetype: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true
  })
  public title: string;

  @Column({
    type: 'uuid'
  })
  public dayId: string;

  @ManyToOne(() => Day, day => day.attachments)
  public day?: Day;
}