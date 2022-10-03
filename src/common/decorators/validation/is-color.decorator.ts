import { registerDecorator, ValidationOptions } from 'class-validator';
import { isColor } from '../../validation/is-color.validation';

export function IsColor(options?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'isColor',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate: isColor
      }
    });
  }
}
