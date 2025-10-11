import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvertCreateForm } from '../domain/create-advert';

@Injectable({
  providedIn: 'root',
})
export class CreateAdvertFormService {
  // advertForm: FormGroup<AvertCreateForm>;

  private fb = inject(FormBuilder);

  getForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: [''],
      images: [''],
      cost: [0, Validators.required],
      email: [''],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  submitAdvertForm() {}
}
