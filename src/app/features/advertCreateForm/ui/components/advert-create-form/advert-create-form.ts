import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvertCreateForm } from '../../../domain/create-advert';
import { CreateAdvertFormService } from '../../../services/create-advert.form.service';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriesStoreService } from '../../../../../entries/catergories/categories.store.service';
import { CascadeSelect } from 'primeng/cascadeselect';
import { TextareaModule } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import { Fluid } from 'primeng/fluid';
import { AdvertApiService } from '@infrastructure';
import { InputMask } from 'primeng/inputmask';
import {
  FileSelectEvent,
  FileUpload,
  FileUploadEvent,
} from 'primeng/fileupload';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DadataService } from '../../../../../entries/dadata/dadata.service';
import { DadataStoreService } from '../../../../../entries/dadata/dadata.store.service';
import { CreateAdvertService } from '../../../services/create-advert.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-advert-create-form',
  imports: [
    ReactiveFormsModule,
    Button,
    InputTextModule,
    CascadeSelect,
    FormsModule,
    TextareaModule,
    InputNumber,
    InputMask,
    FileUpload,
    AutoComplete,
  ],
  templateUrl: './advert-create-form.html',
  styleUrl: './advert-create-form.scss',
  standalone: true,
})
export class AdvertCreateForm {
  private advertFormService = inject(CreateAdvertFormService);
  private advertApiService = inject(AdvertApiService);
  private createAdvertService = inject(CreateAdvertService);

  private dadataService = inject(DadataService);
  private dadataStoreService = inject(DadataStoreService);
  categoriesStoreService = inject(CategoriesStoreService);

  advertForm: FormGroup<AvertCreateForm>;

  uploadedFiles: any[] = [];

  onSelect(e: FileSelectEvent) {
    this.uploadedFiles.push(...e.files);
  }

  onUpload(e: FileUploadEvent) {}

  constructor() {
    this.advertForm = this.advertFormService.getForm();
  }

  selectedCategory: any;

  selectedAddress = '';

  suggestions() {
    return this.dadataStoreService.getAddressSuggestion();
  }

  advertSubmit() {
    const phone =
      this.advertForm.get('phone')?.value.replace(/[()\-\s]/g, '') ?? '';

    const dataFormatted = {
      categoryId: this.advertForm.get('categoryId')?.value?.value ?? '',
      name: this.advertForm.get('name')?.value ?? '',
      cost: this.advertForm.get('cost')?.value ?? 0,
      phone: phone,
      location: this.advertForm.get('location')?.value ?? '',
      images: this.uploadedFiles,
    };

    // this.advertApiService.createAdvert(dataFormatted).subscribe();
    this.createAdvertService.createAdvert(dataFormatted).subscribe();
  }
  Categories() {
    return this.categoriesStoreService.getCategories() as any;
  }

  search(event: AutoCompleteCompleteEvent) {
    this.dadataService.getAddressSuggestion(event).subscribe();
  }
}
