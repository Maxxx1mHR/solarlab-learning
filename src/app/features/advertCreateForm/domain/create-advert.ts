import { FormControl } from '@angular/forms';

export interface AvertCreateForm {
  name: FormControl<string>;
  description?: FormControl<string>;
  images?: FormControl<string[]>;
  cost: FormControl<number>;
  email?: FormControl<string>;
  phone: FormControl<string>;
  location: FormControl<string>;
  categoryId: FormControl<CategoryNode>;
}

export interface CategoryNode {
  label: string;
  value: string; // id категории
  fullPath: string;
  items?: CategoryNode[]; // дети
}
