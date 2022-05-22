import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from '../days/day.entity';
import { Emotion } from '../emotions/emotion.entity';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

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

  @Column({
    type: 'text',
  })
  @Exclude({ toPlainOnly: true })
  public password: string;

  @ApiProperty({
    type: () => [Emotion],
    description: 'User emotions'
  })
  @OneToMany(() => Emotion, emotion => emotion.user)
  public emotions?: Emotion[];

  @OneToMany(() => Day, day => day.user)
  public days?: Day[];

  @BeforeInsert()
  private async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
