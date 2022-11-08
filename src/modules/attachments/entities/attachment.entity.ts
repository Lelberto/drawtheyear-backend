import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Timestamps } from '../../../common/entities/timestamps.interface';
import { Day } from '../../days/entities/day.entity';

@Entity()
export class Attachment implements Timestamps {
  
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 30
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  @Exclude({ toPlainOnly: true })
  public path: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true
  })
  public mimeType: string;

  @ManyToOne(() => Day, day => day.attachments)
  public day: Day;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  public get extension() {
    return this.path?.substring(this.path?.lastIndexOf('.') + 1);
  }
}
