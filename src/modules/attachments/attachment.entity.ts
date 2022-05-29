import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from '../days/day.entity';

/**
 * Attachment entity
 */
@Entity()
export class Attachment {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({
    type: 'varchar'
  })
  @Exclude({ toPlainOnly: true })
  public filename: string;

  @ApiProperty({
    format: 'mimetype'
  })
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

  /** Gets the filename extension */
  public get extension(): string {
    return this.filename.substring(this.filename.lastIndexOf('.') + 1).toLowerCase();
  }
}
