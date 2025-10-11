import { computed, inject, Injectable, signal } from '@angular/core';
import { CategoriesApiService } from '@infrastructure';
import { MenuItem } from 'primeng/api';
import { Category } from '../../infrastructure/categories/dto';
import { Observable } from 'rxjs';
import { Menu } from 'primeng/menu';
import { CategoryNode } from './categories.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesStoreService {
  private _categories = signal<CategoryNode[]>([]);

  categories = computed(() => this._categories());

  setCategories(categories: CategoryNode[]) {
    this._categories.set(categories);
  }

  getCategories() {
    return this.categories();
  }
}
