import * as Tranformer from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export type Clazz<T> = ClassType<T>;

export class ClassTransformer {
  static fromPlain<T>(
    entityClass: Clazz<T>,
    entity: Object | null,
    excludeExtraneousValues = true,
  ): T {
    return Tranformer.plainToClass(entityClass, entity, {
      excludeExtraneousValues,
    });
  }

  static toPlain<T>(entity: T): Object {
    return JSON.parse(JSON.stringify(Tranformer.classToPlain(entity)));
  }

  static trimExcluded<T>(entity: T): T {
    const clone = this.clone(entity);
    return Tranformer.plainToClassFromExist(clone, this.toPlain(entity));
  }

  static clone<T>(entity: T): T {
    return Tranformer.classToClass<T>(entity);
  }

  static serialize<T>(entity: T): string {
    return Tranformer.serialize(entity);
  }

  static deserialize<T>(entityClass: Clazz<T>, entity: string): T {
    return Tranformer.deserialize(entityClass, entity);
  }

  static deserializeIterable<T>(entityClass: Clazz<T>, entity: string): T[] {
    return Tranformer.deserializeArray(entityClass, entity);
  }
}
