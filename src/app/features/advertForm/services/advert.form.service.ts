import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AvertCreateForm } from '../domain/advert';
import { CategoryNode } from '@entities';
import { AdvertDetail } from '@features';

@Injectable({
  providedIn: 'root',
})
export class AdvertFormService {
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
      name: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),
      description: this.fb.control('', Validators.maxLength(255)),
      images: this.fb.control<File[]>([]), // TODO в форме есть но не управляется ей.
      cost: this.fb.nonNullable.control<number | null>(
        null,
        Validators.required,
      ),
      email: this.fb.control('', Validators.email),
      phone: this.fb.nonNullable.control('', Validators.required),
      location: this.fb.nonNullable.control('', Validators.required),
      categoryId: this.fb.control<CategoryNode | null>(null, [
        Validators.required,
      ]),
    });
  }

  setForm(
    form: AvertCreateForm,
    advertDetail: AdvertDetail,
    categories: CategoryNode[],
  ) {
    const { advert, user } = advertDetail;
    const leaf = advert.category?.id
      ? this.findCategoryById(categories, advert.category.id)
      : undefined;

    form.reset(
      {
        categoryId: leaf,
        name: advert.title,
        description: advert.description,
        location: advert.location,
        cost: Number(advert.price),
        email: user.email,
        phone: user.phone,
      },
      { emitEvent: false }, // TODO
    );
  }
}
