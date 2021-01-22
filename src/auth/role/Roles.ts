import { AuthUser } from '../AuthUser';
import { Role } from './Role';

export interface Roles {
  get(role: string): Role | undefined;

  includes(role: Role, user?: AuthUser): boolean;
}
