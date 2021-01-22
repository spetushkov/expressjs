import { NextFunction, RequestHandler, Response } from 'express';
import { PermissionManager } from '../../../auth/permisssion/PermissionManager';
import { Role } from '../../../auth/role/Role';
import { ServerException } from '../exception/ServerException';
import { BaseRequest } from '../route/BaseRequest';

export const Authorize = (
  role: Role,
  permissionSchemaId: string,
  permission?: string,
): RequestHandler => (req: BaseRequest, res: Response, next: NextFunction) => {
  try {
    if (!PermissionManager.hasPermission(role, permissionSchemaId, permission)) {
      throw ServerException.InvalidAccessException();
    }

    next();
  } catch (error) {
    next(error);
  }
};
