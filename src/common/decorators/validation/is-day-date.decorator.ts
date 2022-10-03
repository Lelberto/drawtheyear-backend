import { registerDecorator, ValidationOptions } from 'class-validator';
import { isDayDate } from '../../validation/is-day-date.validation';

export function IsDayDate(options?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'isDayDate',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate: isDayDate,
        defaultMessage: () => 'Invalid day date'
      }
    });
  }
}
