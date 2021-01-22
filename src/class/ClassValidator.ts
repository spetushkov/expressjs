import * as Validator from 'class-validator';

export class ClassValidator {
  static async validate(obj: Object, skipMissingProperties: boolean): Promise<string[]> {
    try {
      const options: Validator.ValidatorOptions = {
        skipUndefinedProperties: false,
        skipNullProperties: false,
        skipMissingProperties,
        dismissDefaultMessages: false,
        validationError: {
          target: true,
          value: true,
        },
        forbidUnknownValues: true,
      };

      const errors = await Validator.validate(obj, options);
      if (errors.length === 0) {
        return Promise.resolve([]);
      }

      const messages = this.reduceConstraintMessages([], errors);
      return Promise.resolve(messages);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private static reduceConstraintMessages(
    accumulator: string[],
    errors: Validator.ValidationError[],
  ): string[] {
    let accumulatorUpdated = [...accumulator];
    errors.forEach((error) => {
      if (error.constraints) {
        accumulatorUpdated = [...accumulatorUpdated, ...Object.values(error.constraints)];
      }
      if (error.children) {
        accumulatorUpdated = this.reduceConstraintMessages(accumulatorUpdated, error.children);
      }
    });
    return accumulatorUpdated;
  }
}
