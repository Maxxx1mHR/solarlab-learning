import { Component, effect, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { AdvertDetailStoreService } from '../../../../advertDetail/services/advert.detail.store.service';
import { Images } from '../../../../advertDetail/domain/advert.detail';
import { AdvertService } from '../../../../myAdverts/service/advert.service';
import { ActivatedRoute } from '@angular/router';

interface MenuNode {
  label: string;
  value?: string;
  items?: MenuNode[];
}
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
  advertDetailStoreService = inject(AdvertDetailStoreService);
  private advertService = inject(AdvertService);
  private activatedRoute = inject(ActivatedRoute);

  private dadataService = inject(DadataService);
  private dadataStoreService = inject(DadataStoreService);
  categoriesStoreService = inject(CategoriesStoreService);

  advertForm: FormGroup<AvertCreateForm>;

  public id = this.activatedRoute.snapshot.params['id'];

  isEdit = input(false);

  images: Images[] = [];

  uploadedFiles: any[] = [];

  onSelect(e: FileSelectEvent) {
    console.log('e', e);
    this.uploadedFiles.push(...e.files);
  }

  editAdvertId =
    this.advertDetailStoreService.advertDetail()?.advert.id ?? this.id;

  selectDeletedImages: string[] = [];

  onUpload(e: FileUploadEvent) {}

  updateAdvertForm: FormGroup;

  findCategoryById(nodes: MenuNode[], id: string): MenuNode | undefined {
    for (const node of nodes) {
      if (node.value === id) return node;
      if (node.items?.length) {
        const found = this.findCategoryById(node.items, id);
        if (found) return found;
      }
    }
    return undefined;
  }

  constructor(private formBuilder: FormBuilder) {
    this.advertForm = this.advertFormService.getForm();

    const advert = this.advertDetailStoreService.advertDetail()?.advert;

    console.log(advert);

    this.updateAdvertForm = formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      images: new FormControl(''),
      cost: new FormControl(0, [Validators.required]),
      email: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
    });

    effect(() => {
      const detail = this.advertDetailStoreService.advertDetail();
      if (!detail) return;

      this.images.push(...detail.advert.imageSrc);

      console.log('images', this.images);

      const categories = this.categoriesStoreService.getCategories();

      const { advert, user } = detail;

      const leaf = advert.category?.id
        ? this.findCategoryById(categories, advert.category.id)
        : undefined;

      console.log('detail', detail);

      this.updateAdvertForm.reset(
        {
          categoryId: leaf,
          name: advert.title ?? '',
          description: advert.description ?? '',
          location: advert.location ?? '',
          cost: advert.price ?? 0,
          email: user.email ?? '',
          phone: user.phone ?? '',
        },
        { emitEvent: false },
      );
      console.log(this.selectedCategory);
      this.selectedCategory = advert.category;

      this.createAdvertService.getEditAdvertImages(advert.imageSrc).subscribe();
    });
  }

  selectedCategory: any;

  selectedAddress = '';

  suggestions() {
    return this.dadataStoreService.getAddressSuggestion();
  }

  deleteImage(id: string) {
    this.images = this.images.filter((image) => image.id !== id);
    this.selectDeletedImages.push(id);
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

  advertUpdate() {
    const phone =
      this.updateAdvertForm.get('phone')?.value.replace(/[()\-\s]/g, '') ?? '';

    const dataFormatted = {
      categoryId: this.updateAdvertForm.get('categoryId')?.value?.value ?? '',
      name: this.updateAdvertForm.get('name')?.value ?? '',
      cost: this.updateAdvertForm.get('cost')?.value ?? 0,
      phone: phone,
      location: this.updateAdvertForm.get('location')?.value ?? '',
      images: this.uploadedFiles,
    };
    this.advertService
      .updateAdvert(this.selectDeletedImages, this.editAdvertId, dataFormatted)
      .subscribe();
  }

  Categories() {
    console.log('Категории', this.categoriesStoreService.getCategories());
    return this.categoriesStoreService.getCategories() as any;
  }

  search(event: AutoCompleteCompleteEvent) {
    this.dadataService.getAddressSuggestion(event).subscribe();
  }
}
