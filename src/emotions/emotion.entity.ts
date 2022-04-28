import { User } from 'src/users/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Emotion entity
 */
@Entity()
export class Emotion extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  public id: string;
  
  @Column({
    type: 'varchar',
    length: 50
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 7
  })
  public color: string;

  @ManyToOne(() => User, user => user.emotions)
  public user: User | number;
}
