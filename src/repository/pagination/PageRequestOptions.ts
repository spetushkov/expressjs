import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { PageRequest } from './PageRequest';

export class PageRequestOptions extends PageRequest {
  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sort?: string;

  @Expose()
  @IsOptional()
  @IsNumberString()
  @IsNotEmpty()
  page?: string;

  @Expose()
  @IsOptional()
  @IsNumberString()
  @IsNotEmpty()
  pageLimit?: string;
}
