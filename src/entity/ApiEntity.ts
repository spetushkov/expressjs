import { Entity } from './Entity';

export interface ApiEntity extends Entity {
  id: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;

  getPrimaryKeys(): string[];
}
