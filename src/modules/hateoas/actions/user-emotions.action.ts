import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `user-emotions`
 */
export class UserEmotionsAction extends Action {

  private readonly username: string;

  public constructor(username: string) {
    super('user-emotions', Method.GET);
    this.username = username;
  }

  public buildHref(): string {
    return `/users/${this.username}/emotions`;
  }
}
