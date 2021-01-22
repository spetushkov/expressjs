export interface Result<T, E> {
  data?: T | T[];
  error?: E;
}
