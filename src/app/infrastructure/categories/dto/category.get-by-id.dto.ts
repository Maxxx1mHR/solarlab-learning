import {Category} from './base.dto';

export interface GetCategoryResponseDto extends Category {
  childs: Category[]
}
