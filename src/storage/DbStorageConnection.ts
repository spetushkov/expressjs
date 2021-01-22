export interface DbStorageConnection {
  host: string;
  name: string;
  user: string;
  userPassword: string;

  getConnectionUri(): string;
}
