import {Category} from './base.dto';

export interface CreateCategoryRequestDto {
  name: string;
  parentId?: string
}

export type CreateCategoryResponseDto = Category
