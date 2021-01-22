import { ApiEntity } from '../repository/ApiEntity';

export interface AuthUser extends ApiEntity {
  email: string;
  password: string;
  roles?: string[];
}
