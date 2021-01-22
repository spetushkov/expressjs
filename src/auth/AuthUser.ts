import { ApiEntity } from '../entity/ApiEntity';

export interface AuthUser extends ApiEntity {
  email: string;
  password: string;
  roles?: string[];
}
