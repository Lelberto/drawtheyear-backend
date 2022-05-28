import { Link } from '../hateoas.types';
import { Action } from './action';

/**
 * HATEOAS action builder
 */
export class ActionBuilder {

  private readonly actions: Action[];
  private readonly options: ActionBuilderOptions;

  public constructor(options = actionBuilderOptionsDefault) {
    this.actions = [];
    this.options = options;
  }

  /**
   * Builds actions
   * 
   * @returns Builded links
   */
  public build(): Link[] {
    return this.actions.map(action => ({
      rel: action.name,
      method: action.method,
      href: `${this.options.hrefPrefix}${action.buildHref()}`
    }));
  }

  /**
   * Adds an action to the builder
   * 
   * @param action Action to add
   * @returns `this`
   */
  public add(action: Action): ActionBuilder {
    this.actions.push(action);
    return this;
  }
}

/**
 * HATEOAS action builder options
 */
export type ActionBuilderOptions = {
  hrefPrefix?: string;
}

/** HATEOAS action builder default options */
const actionBuilderOptionsDefault: ActionBuilderOptions = {
  hrefPrefix: ''
}
