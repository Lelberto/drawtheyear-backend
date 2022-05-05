/**
 * Fixture class
 * 
 * A fixture is used for testing to create fake entities.
 */
export abstract class Fixture<T, D> {

  private readonly references: Map<string, any>;

  /**
   * Creates a new fixture
   * 
   * @param references References map
   */
  public constructor(references: Map<string, any>) {
    this.references = references;
  }

  /**
   * Creates one fixture instance
   */
  public abstract createOne(dto?: D): T;

  /**
   * Creates multiple fixture instances
   * 
   * @param count Fixture instance coune
   */
  public createMany(count: number): T[] {
    const fixtures: T[] = [];
    for (let i = 0; i < count; i++) {
      fixtures.push(this.createOne());
    }
    return fixtures;
  }

  protected getReference<R>(ref: string): R {
    return this.references.get(ref);
  }

  protected setReference<R>(ref: string, value: R): void {
    this.references.set(ref, value);
  }
}
