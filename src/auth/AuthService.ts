import { AuthResult } from './response/AuthResult';

export interface AuthService<T, K> {
  signUp(user: T): Promise<AuthResult<K>>;
  signIn(user: T): Promise<AuthResult<K>>;
  signOut(): Promise<AuthResult<boolean>>;
  findById(userId: string): Promise<T>;
  getSecret(): string;
}
