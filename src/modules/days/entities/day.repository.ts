import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Day } from './day.entity';

@Injectable()
export class DayRepository extends Repository<Day> {

  public constructor(dataSource: DataSource) {
    super(Day, dataSource.createEntityManager());
  }

  public async findByYear(user: User, year: number): Promise<Day[]> {
    console.log(typeof year);
    return await this.createQueryBuilder()
      .select()
      .where('user_id = :userId', { userId: user.id })
      // .andWhere('YEAR(date) = :year', { year }) 
      .andWhere('date BETWEEN \':year-01-01\' AND \':year-12-31\'', { year }) // TODO YEAR() in production
      .getMany();
  }
}
