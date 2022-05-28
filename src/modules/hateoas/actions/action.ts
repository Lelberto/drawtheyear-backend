import { Method } from '../hateoas.types';

/**
 * HATEOAS action
 * 
 * To create a new action, create a new class that extends it.
 */
export abstract class Action {
  
  public readonly name: string;
  public readonly method: Method;
  
  public constructor(name: string, method: Method) {
    this.name = name;
    this.method = method;
  }

  /**
   * Builds the action href
   */
  public abstract buildHref(): string;
}
