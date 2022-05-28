import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `user-days`
 */
export class UserDaysAction extends Action {

  private readonly userId: string;

  public constructor(userId: string) {
    super('user-days', Method.GET);
    this.userId = userId;
  }

  public buildHref(): string {
    return `/users/${this.userId}/days`;
  }
}
