import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `users`
 */
export class UsersAction extends Action {

  public constructor() {
    super('users', Method.GET);
  }

  public buildHref(): string {
    return '/users';
  }
}
