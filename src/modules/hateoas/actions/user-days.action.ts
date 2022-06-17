import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `user-days-{year}`
 */
export class UserDaysAction extends Action {

  private readonly username: string;
  private readonly year: number;

  public constructor(username: string, year: number) {
    super(`user-days-${year}`, Method.GET);
    this.username = username;
    this.year = year;
  }

  public buildHref(): string {
    return `/users/${this.username}/days?from=${this.year}-01-01&to=${this.year}-12-31`;
  }
}
