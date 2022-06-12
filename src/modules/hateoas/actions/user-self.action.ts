import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `user-self`
 */
export class UserSelfAction extends Action {

  private readonly username: string;

  public constructor(username: string) {
    super('user-self', Method.GET);
    this.username = username;
  }

  public buildHref(): string {
    return `/users/${this.username}`;
  }
}
