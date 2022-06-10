import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `day-self`
 */
export class DaySelfAction extends Action {

  private readonly username: string;
  private readonly dayDate: string;

  public constructor(username: string, dayDate: string) {
    super('day-self', Method.GET);
    this.username = username;
    this.dayDate = dayDate;
  }

  public buildHref(): string {
    return `/users/${this.username}/days/${this.dayDate}`;
  }
}
