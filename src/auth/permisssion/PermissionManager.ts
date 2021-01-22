import { Role } from '../role/Role';

export class PermissionManager {
  static hasPermission(
    role: Role | undefined,
    permissionSchemaId: string,
    permission?: string,
  ): boolean {
    if (!role || !permission) {
      return false;
    }

    const permissionSchemaKey = Object.keys(role).find((key) => key === permissionSchemaId);
    if (!permissionSchemaKey) {
      return false;
    }

    const permissionSchema = Object.entries(role[permissionSchemaKey as keyof typeof role]).find(
      ([key, value]) => key === permission,
    );

    if (!permissionSchema || permissionSchema.length !== 2) {
      return false;
    }

    return permissionSchema[1] as boolean;
  }
}
