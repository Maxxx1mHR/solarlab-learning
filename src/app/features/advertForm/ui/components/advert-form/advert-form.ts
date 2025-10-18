import {
  Component,
  effect,
  inject,
  input,
  signal,
  OnInit,
  model,
  computed,
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
  FileRemoveEvent,
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
import { ValidationMessage } from '@shared';
import { finalize } from 'rxjs';

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
    ValidationMessage,
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
  MAX_COUNT_IMAGE = 10;
  public readonly advertForm: AvertCreateForm =
    this.createAdvertFormService.getForm();

  categoryId = signal<string>('');

  public id = this.activatedRoute.snapshot.params['id'];

  readonly isEdit = model(false);
  readonly formSendLoading = signal(false);

  categoryLoading = false;

  // images: Images[] = [];

  images = signal<Images[]>([]);

  uploadedFiles = signal<File[]>([]);
  // uploadedFiles: File[] = [];

  readonly fileLimit = computed(
    () =>
      this.MAX_COUNT_IMAGE -
      this.images().length -
      new Set(this.uploadedFiles()).size,
  );
  onSelect(e: FileSelectEvent) {
    console.log('1,', e);
    this.uploadedFiles.update((arr) => [...arr, ...e.currentFiles]);
  }
  onRemove(e: FileRemoveEvent) {
    this.uploadedFiles.update((arr) => arr.filter((file) => file !== e.file));
  }

  editAdvertId =
    this.advertDetailStoreService.advertDetail()?.advert.id ?? this.id;

  // selectDeletedImages: string[] = [];
  selectDeletedImages = signal<string[]>([]);

  cats: any;

  categories = this.categoriesStoreService.categories;

  constructor() {
    effect(() => {
      this.cats = this.categories(); // <- реактивно
      if (!this.cats?.length) return;
      const detail = this.advertDetailStoreService.advertDetail();
      if (this.isEdit() && detail) {
        this.createAdvertFormService.setForm(
          this.advertForm,
          detail,
          this.cats,
        );
        // this.images = detail.advert.imageSrc;
        this.images.set(detail.advert.imageSrc);
      } else {
        this.advertForm.reset();
      }

      // this.createAdvertService
      //   .getEditAdvertImages(detail.advert.imageSrc)
      //   .subscribe();
    });
  }

  ngOnInit() {
    this.categoryLoading = true;
    this.categoriesService.getCategories().subscribe({
      complete: () => (this.categoryLoading = false),
    });
  }

  deleteImage(id: string) {
    this.images.set(this.images().filter((image) => image.id !== id));
    // this.selectDeletedImages.push(id);
    this.selectDeletedImages.update((arr) => [...arr, id]);
  }

  advertSubmit() {
    this.formSendLoading.set(true);
    this.createAdvertService
      .createAdvert(mapAdvertFormToDto(this.advertForm, this.uploadedFiles()))
      .pipe(finalize(() => this.formSendLoading.set(false)))
      .subscribe();
  }

  advertUpdate() {
    this.formSendLoading.set(true);
    this.createAdvertService
      .updateAdvert(
        this.selectDeletedImages(),
        this.editAdvertId,
        mapAdvertFormToDto(this.advertForm, this.uploadedFiles()),
      )
      .pipe(finalize(() => this.formSendLoading.set(false)))
      .subscribe();
  }

  suggestions() {
    return this.dadataStoreService.getAddressSuggestion();
  }

  search(event: AutoCompleteCompleteEvent) {
    this.dadataService.getAddressSuggestion(event).subscribe();
  }
}
