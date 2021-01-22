export class BooleanUtils {
  static fromString(value: string): boolean {
    return JSON.parse(value);
  }
}
