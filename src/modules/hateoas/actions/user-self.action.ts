import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `user-self`
 */
export class UserSelfAction extends Action {

  private readonly userId: string;

  public constructor(userId: string) {
    super('user-self', Method.GET);
    this.userId = userId;
  }

  public buildHref(): string {
    return `/users/${this.userId}`;
  }
}
