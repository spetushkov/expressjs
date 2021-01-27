import { Document } from 'mongoose';

export class MongoDbUtils {
  static async expose(doc: Document): Promise<Document> {
    try {
      const keys = doc.schema.statics.getForeignKeys();
      for (const key of keys) {
        await doc.populate(key).execPopulate();
      }
      return Promise.resolve(doc);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static toObjectId(objectIdholder: string): any {
    return (value: any, obj: any) => {
      return value ? value.toString() : obj[objectIdholder];
    };
  }

  static toArrayObjectId(objectIdholder: string): any {
    return (values: any[], obj: any) => {
      return values ? values.map((value) => value.toString()) : obj[objectIdholder];
    };
  }
}
