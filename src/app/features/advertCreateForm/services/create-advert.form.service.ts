import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AvertCreateForm } from '../domain/create-advert';
import { CategoriesStoreService, CategoryNode } from '@entities';
import { AdvertDetail } from '../../advertDetail/domain/advert.detail';
import { AdvertDetailStoreService } from '../../advertDetail/services/advert.detail.store.service';

// interface MenuNode {
//   label: string;
//   value?: string;
//   items?: MenuNode[];
// }

@Injectable({
  providedIn: 'root',
})
export class CreateAdvertFormService {
  private readonly advertDetailStoreService = inject(AdvertDetailStoreService);
  private categoriesStoreService = inject(CategoriesStoreService);

  private fb = inject(FormBuilder);

  findCategoryById(
    nodes: CategoryNode[],
    id: string,
  ): CategoryNode | undefined {
    for (const node of nodes) {
      if (node.value === id) return node;
      if (node.items?.length) {
        const found = this.findCategoryById(node.items, id);
        if (found) return found;
      }
    }
    return undefined;
  }

  getForm(): AvertCreateForm {
    return this.fb.group({
      name: this.fb.nonNullable.control('', Validators.required),
      description: this.fb.control(''),
      images: this.fb.control<File[]>([]), // TODO Убрать из формы, т.к. p-fileupload не может быт связан с формой
      cost: this.fb.nonNullable.control(0),
      email: this.fb.control(''),
      phone: this.fb.nonNullable.control(''),
      location: this.fb.nonNullable.control(''),
      // categoryId: this.fb.nonNullable.control<CategoryNode>({
      //   label: 'Работа',
      //   items: [],
      //   fullPath: 'Работа',
      //   value: '19dca9ff-4528-4659-b92f-1772613a96ee',
      // }),
      categoryId: this.fb.control<CategoryNode | null>(null),
    });
  }

  setForm(
    form: AvertCreateForm,
    advertDetail: AdvertDetail,
    categories: CategoryNode[],
  ) {
    // const categories = this.categoriesStoreService.getCategories();

    console.log('!!', categories);

    const { advert, user } = advertDetail;
    const leaf = advert.category?.id
      ? this.findCategoryById(categories, advert.category.id)
      : undefined;

    console.log('leaf123', leaf);

    form.reset(
      {
        categoryId: leaf,
        // categoryId: advert.category.id,
        // categoryId: '19dca9ff-4528-4659-b92f-1772613a96ee',
        name: advert.title,
        description: advert.description,
        location: advert.location,
        cost: Number(advert.price),
        email: user.email,
        phone: user.phone,
      },
      { emitEvent: false }, // TODO
    );
    console.log('form', form);
  }
}
