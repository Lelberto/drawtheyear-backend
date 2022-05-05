import { EmotionFixture } from './emotion.fixture';
import { UserFixture } from './user.fixture';

/**
 * Fixtures manager
 * 
 * This class is used to create fixtures for testing.
 */
export class FixtureManager {

  private readonly references: Map<string, any>;
  public readonly users: UserFixture;
  public readonly emotions: EmotionFixture;

  /**
   * Creates a new fixtures manager
   */
  public constructor() {
    this.references = new Map();
    this.users = new UserFixture(this.references);
    this.emotions = new EmotionFixture(this.references);
  }
}
