import { inject, Injectable } from '@angular/core';
import { CategoriesApiService } from '@infrastructure';

@Injectable({
  providedIn: 'root',
})
export class CategoriesStoreService {
  private categoriesApiService = inject(CategoriesApiService);

  getCategories() {}
}
