import { FormControl, FormGroup } from '@angular/forms';
import { CategoryNode } from '@entities';

export type AvertCreateForm = FormGroup<{
  name: FormControl<string>;
  description: FormControl<string | null>;
  images: FormControl<File[] | null>;
  cost: FormControl<number>;
  email: FormControl<string | null>;
  phone: FormControl<string>;
  location: FormControl<string>;
  categoryId: FormControl<CategoryNode | null>;
  // categoryId: FormControl<string>;
}>;

// export interface AvertCreateForm {
//   name: FormControl<string>;
//   description?: FormControl<string>;
// }

// export interface CategoryNode {
//   label: string;
//   value: string; // id категории
//   fullPath: string;
//   items?: CategoryNode[]; // дети
// }
