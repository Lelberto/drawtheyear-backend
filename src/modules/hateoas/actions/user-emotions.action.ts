import { Method } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action for `user-emotions`
 */
export class UserEmotionsAction extends Action {

  private readonly userId: string;

  public constructor(userId: string) {
    super('user-emotions', Method.GET);
    this.userId = userId;
  }

  public buildHref(): string {
    return `/users/${this.userId}/emotions`;
  }
}
