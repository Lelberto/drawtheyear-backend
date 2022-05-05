import faker from '@faker-js/faker';
import { CreateEmotionDto } from '../../src/emotions/emotion.dto';
import { Emotion } from '../../src/emotions/emotion.entity';
import { User } from '../../src/users/user.entity';
import { Fixture } from './fixture';
import { UserFixture } from './user.fixture';

/**
 * Emotion fixture class
 */
export class EmotionFixture extends Fixture<Emotion, CreateEmotionDto> {

  /** Reference for all emotion fixtures */
  public static REF_EMOTIONS: string;

  public constructor(references: Map<string, any>) {
    super(references);
    this.setReference(EmotionFixture.REF_EMOTIONS, []);
  }

  public createOne(dto?: CreateEmotionDto): Emotion {
    const emotion = new Emotion();

    emotion.id = faker.datatype.uuid();
    emotion.name = dto?.name || faker.word.adverb();
    emotion.color = dto?.color || faker.internet.color();
    emotion.user = faker.helpers.arrayElement(this.getReference<User[]>(UserFixture.REF_USERS));

    this.getReference<Emotion[]>(EmotionFixture.REF_EMOTIONS).push(emotion);

    return emotion;
  }
}
