import { Component, inject, signal, OnInit } from '@angular/core';
import { AdvertService } from '../../../services/advert.service';
import { MenuItem } from 'primeng/api';
import { Category } from '../../../../../infrastructure/categories/dto';
import { CategoriesService } from '../../../../../entities/catergories/categories.service';
import { Button } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { TieredMenu } from 'primeng/tieredmenu';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Message } from 'primeng/message';
import { AdvertSearchStoreService } from '../../../services/advert-search.store.service';
import { CategoriesStoreService } from '../../../../../entities/catergories/categories.store.service';
import { CascadeSelect } from 'primeng/cascadeselect';
import { CategoryNode } from '@entities';

interface Test {
  name: string;
  code: string;
  states: {
    name: string;
    cities: { cname: string; code: string }[];
  }[];
}

@Component({
  selector: 'app-advert-search',
  imports: [
    Button,
    PopoverModule,
    TieredMenu,
    FormsModule,
    ReactiveFormsModule,
    Message,
    CascadeSelect,
  ],
  templateUrl: './advert-search.html',
  styleUrl: './advert-search.scss',
  standalone: true,
})
export class AdvertSearch implements OnInit {
  private advertService = inject(AdvertService);
  categoriesStoreService = inject(CategoriesStoreService);
  advertSearchStoreService = inject(AdvertSearchStoreService);
  categoriesService = inject(CategoriesService);
  menuItem = signal<MenuItem[]>([]);

  categoryId = signal<string>('');
  advertSearch = signal<string>('');

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group({
      search: new FormControl('', [Validators.required]),
    });
  }

  onSearch() {
    const search = this.searchForm.get('search')?.value;
    this.advertService
      .advertSearch({
        search: search,
        showNonActive: true,
        category: this.categoryId(),
      })
      .subscribe();
  }

  items: MenuItem[] | undefined;

  // onCategoryClick(category: Category, fullPath: string) {
  //   console.log(this.menuItem());
  //   console.log('Выбрана категория:', category);
  //   console.log('fullPath:', fullPath);
  //   this.categoryId.set(category.id);
  // }
  //
  // mapCategories(
  //   categories: Category[],
  //   parentId = '00000000-0000-0000-0000-000000000000',
  //   parentPath = '',
  // ): MenuItem[] {
  //   return categories
  //     .filter((category) => category.parentId === parentId)
  //     .map((category) => {
  //       const fullPath = parentPath
  //         ? `${parentPath} / ${category.name}`
  //         : category.name;
  //       const children = this.mapCategories(categories, category.id, fullPath);
  //
  //       console.log('children', children);
  //
  //       return {
  //         id: category.id,
  //         label: category.name,
  //         items: children.length > 0 ? children : undefined,
  //         fullPath,
  //         command: () => this.onCategoryClick(category, fullPath),
  //       };
  //     });
  // }

  onCategoryChange(e: any) {
    const node = e?.value as CategoryNode | undefined;
    this.categoryId.set(node?.value ?? '');
  }

  // countries: Test[] = [];

  selectedCategory: any;

  onCategorySelected(e: any) {
    // console.log('selectedCategory via event:', e.value);
    // если нужен id:
    // console.log('categoryId:', e.value?.value);

    this.categoryId.set(e.value?.value);
  }

  Categories() {
    return this.categoriesStoreService.getCategories() as any;
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe();
  }

  protected readonly Boolean = Boolean;
}
