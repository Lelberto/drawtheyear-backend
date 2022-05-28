import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `day-self`
 */
export class DaySelfAction extends Action {

  private readonly userId: string;
  private readonly dayDate: string;

  public constructor(userId: string, dayDate: string) {
    super('day-self', Method.GET);
    this.userId = userId;
    this.dayDate = dayDate;
  }

  public buildHref(): string {
    return `/users/${this.userId}/days/${this.dayDate}`;
  }
}
