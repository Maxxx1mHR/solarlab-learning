import { Component, inject, signal, OnInit } from '@angular/core';
import { AdvertService } from '../../../services/advert.service';
import { MenuItem } from 'primeng/api';
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
import { CascadeSelect, CascadeSelectChangeEvent } from 'primeng/cascadeselect';
import { CategoryNode } from '@entities';

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

  selectedCategory: CategoryNode | null = null;

  onCategorySelected(e: CascadeSelectChangeEvent) {
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
