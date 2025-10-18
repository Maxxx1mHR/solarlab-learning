import {
  Component,
  effect,
  inject,
  input,
  signal,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AvertCreateForm } from '../../../domain/advert';
import { AdvertFormService } from '../../../services/advert.form.service';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriesStoreService } from '../../../../../entities/catergories/categories.store.service';
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
import { DadataService } from '../../../../../entities/dadata/dadata.service';
import { DadataStoreService } from '../../../../../entities/dadata/dadata.store.service';
import { AdvertFormApiService } from '../../../services/advert.form.api.service';
import { AdvertDetailStoreService } from '../../../../advertDetail/services/advert.detail.store.service';
import { Images } from '../../../../advertDetail/domain/advert.detail';
import { MyAdvertService } from '../../../../myAdverts/service/my.advert.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, CategoryNode } from '@entities';
import { mapAdvertFormToDto } from '../../../adapters/advert.adapter';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-advert-form',
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
    ProgressSpinner,
  ],
  templateUrl: './advert-form.html',
  styleUrl: './advert-form.scss',
  standalone: true,
})
export class AdvertForm implements OnInit {
  // Services
  private readonly createAdvertFormService = inject(AdvertFormService);
  private readonly advertApiService = inject(AdvertApiService);
  private createAdvertService = inject(AdvertFormApiService);
  advertDetailStoreService = inject(AdvertDetailStoreService);
  private advertService = inject(MyAdvertService);
  private activatedRoute = inject(ActivatedRoute);

  private dadataService = inject(DadataService);
  private dadataStoreService = inject(DadataStoreService);
  categoriesStoreService = inject(CategoriesStoreService);

  private readonly categoriesService = inject(CategoriesService);

  // Variables
  public readonly advertForm: AvertCreateForm =
    this.createAdvertFormService.getForm();

  categoryId = signal<string>('');

  public id = this.activatedRoute.snapshot.params['id'];

  isEdit = input(false);

  categoryLoading = false;

  images: Images[] = [];

  uploadedFiles: File[] = [];

  onSelect(e: FileSelectEvent) {
    this.uploadedFiles.push(...e.files);
  }

  editAdvertId =
    this.advertDetailStoreService.advertDetail()?.advert.id ?? this.id;

  selectDeletedImages: string[] = [];

  cats: any;

  categories = this.categoriesStoreService.categories;

  constructor() {
    effect(() => {
      if (this.isEdit()) {
        this.cats = this.categories(); // <- реактивно
        if (!this.cats?.length) return;
        const detail = this.advertDetailStoreService.advertDetail();
        if (!detail) return;
        this.createAdvertFormService.setForm(
          this.advertForm,
          detail,
          this.cats,
        );
        this.images = detail.advert.imageSrc;
        // this.createAdvertService
        //   .getEditAdvertImages(detail.advert.imageSrc)
        //   .subscribe();
      }
    });
  }

  ngOnInit() {
    this.categoryLoading = true;
    this.categoriesService.getCategories().subscribe({
      complete: () => (this.categoryLoading = false),
    });
  }

  deleteImage(id: string) {
    this.images = this.images.filter((image) => image.id !== id);
    this.selectDeletedImages.push(id);
  }

  advertSubmit() {
    this.createAdvertService
      .createAdvert(mapAdvertFormToDto(this.advertForm, this.uploadedFiles))
      .subscribe();
  }

  advertUpdate() {
    this.createAdvertService
      .updateAdvert(
        this.selectDeletedImages,
        this.editAdvertId,
        mapAdvertFormToDto(this.advertForm, this.uploadedFiles),
      )
      .subscribe();
  }

  suggestions() {
    return this.dadataStoreService.getAddressSuggestion();
  }

  search(event: AutoCompleteCompleteEvent) {
    this.dadataService.getAddressSuggestion(event).subscribe();
  }
}
