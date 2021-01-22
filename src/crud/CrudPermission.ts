import { Permission } from '../auth/permisssion/Permission';

export interface CrudPermission extends Permission {
  findAll: boolean;
  findById: boolean;
  save: boolean;
  updateById: boolean;
  replaceById: boolean;
  deleteById: boolean;
}
