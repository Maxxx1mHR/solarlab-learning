import {Category} from './base.dto';

export interface UpdateCategoryByIdRequestDto {
  name: string;
  patentId?: string
}


export type UpdateCategoryByIdResponseDto = Category
