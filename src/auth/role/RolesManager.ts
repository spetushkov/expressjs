import { Role } from './Role';

export interface RolesManager {
  get(role: string): Role | null;
}
