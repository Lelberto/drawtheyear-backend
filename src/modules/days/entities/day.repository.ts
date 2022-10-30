import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Day } from './day.entity';

@Injectable()
export class DayRepository extends Repository<Day> {

  public constructor(dataSource: DataSource) {
    super(Day, dataSource.createEntityManager());
  }

  public async findByUser(user: User): Promise<Day[]> {
    return await this.createQueryBuilder()
      .relation(User, 'days')
      .of(user)
      .loadMany();
  }

  public async findByDate(user: User, date: Date): Promise<Day> {
    return await this.createQueryBuilder()
      .where('user_id = :userId', { userId: user.id })
      .andWhere('date = :date', { date })
      .getOne();
  }

  public async findByYear(user: User, year: number): Promise<Day[]> {
    return await this.createQueryBuilder()
      .where('user_id = :userId', { userId: user.id })
      .andWhere('date BETWEEN :minDate AND :maxDate', {
        minDate: moment(`${year}-01-01`).format('YYYY-MM-DD'),
        maxDate: moment(`${year}-12-31`).format('YYYY-MM-DD')
      })
      .getMany();
  }
}
