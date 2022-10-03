import { registerDecorator, ValidationOptions } from 'class-validator';
import { isUsername } from '../../validation/is-username.validation';

export function IsUsername(options?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'isUsername',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate: isUsername
      }
    });
  }
}
