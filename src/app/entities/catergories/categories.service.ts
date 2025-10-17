import { inject, Injectable } from '@angular/core';
import { CategoriesApiService } from '@infrastructure';
import { catchError, finalize, map, tap, throwError } from 'rxjs';
import { Category } from '../../infrastructure/categories/dto';
import { MenuItem } from 'primeng/api';
import { CategoriesStoreService } from './categories.store.service';
import { CategoryNode } from './domain/category';

// export interface CategoryNode {
//   label: string;
//   value: string; // id категории
//   fullPath: string;
//   items?: CategoryNode[]; // дети
// }

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesApiService = inject(CategoriesApiService);
  private categoriesStoreService = inject(CategoriesStoreService);

  mapCategories(
    categories: Category[],
    parentId = '00000000-0000-0000-0000-000000000000',
    parentPath = '',
  ): CategoryNode[] {
    return categories
      .filter((category) => category.parentId === parentId)
      .map((category) => {
        const fullPath = parentPath
          ? `${parentPath} / ${category.name}`
          : category.name;
        const children = this.mapCategories(categories, category.id, fullPath);

        // return {
        //   id: category.id,
        //   label: category.name,
        //   items: children.length > 0 ? children : undefined,
        //   fullPath,
        // };
        return {
          value: category.id,
          label: category.name,
          fullPath,
          items: children.length ? children : undefined,
        };
      });
  }

  getCategories() {
    return this.categoriesApiService.getCategories().pipe(
      map((categories) => {
        return this.mapCategories(categories);
      }),
      tap((category) => {
        this.categoriesStoreService.setCategories(category);
      }),
      catchError((err) => {
        return throwError(err);
      }),
      finalize(() => null),
    );
  }
}
