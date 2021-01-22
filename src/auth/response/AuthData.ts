import { AccessToken } from '../accessToken/AccessToken';
import { AuthUser } from '../AuthUser';

export interface AuthData {
  user: AuthUser;
  accessToken: AccessToken;
}
