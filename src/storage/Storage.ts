export interface Storage {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
