export class DateUtils {
  static toISOString(date: Date): string {
    return date.toJSON();
  }

  static fromISOString(isoDate: string): Date {
    return new Date(isoDate);
  }

  static hoursInSeconds(hours: number): number {
    return hours * 60 * 60;
  }
}
