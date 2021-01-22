import { NextFunction, RequestHandler, Response } from 'express';
import { PermissionManager } from '../../../auth/permisssion/PermissionManager';
import { RolesManager } from '../../../auth/role/RolesManager';
import { ServerException } from '../exception/ServerException';
import { BaseRequest } from '../route/BaseRequest';

export const AuthorizeUser = (
  rolesManager: RolesManager,
  permissionSchemaId: string,
  permission?: string,
): RequestHandler => (req: BaseRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user || !user.roles || !permission) {
      throw ServerException.InvalidAccessException();
    }

    let result = false;
    for (const appRole of user.roles) {
      const role = rolesManager.get(appRole);
      if (PermissionManager.hasPermission(role, permissionSchemaId, permission)) {
        result = true;
        break;
      }
    }

    if (!result) {
      throw ServerException.InvalidAccessException();
    }
    next();
  } catch (error) {
    next(error);
  }
};
