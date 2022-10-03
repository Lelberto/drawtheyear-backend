import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Emotion {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 30
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 7
  })
  public color: string;

  @ManyToOne(() => User, user => user.emotions)
  public user: User;
}
