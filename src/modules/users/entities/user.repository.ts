import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {

  public constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async resetUsernameChangeCount(): Promise<number> {
    const query = await this.createQueryBuilder()
      .update()
      .set({ usernameChangeCountToday: 0 })
      .where('usernameChangeCountToday > :min', { min: 0 })
      .execute();
    const { affected } = query;
    return affected;
  }
}
