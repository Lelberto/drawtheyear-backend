import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `user-days`
 */
export class UserDaysAction extends Action {

  private readonly username: string;

  public constructor(username: string) {
    super('user-days', Method.GET);
    this.username = username;
  }

  public buildHref(): string {
    return `/users/${this.username}/days`;
  }
}
