import {
  Component,
  computed,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { Button } from 'primeng/button';
import { CurrencyPipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { AutoComplete } from 'primeng/autocomplete';
import { CascadeSelect } from 'primeng/cascadeselect';
import { FileUpload } from 'primeng/fileupload';
import { InputMask } from 'primeng/inputmask';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import {
  AdvertDetailService,
  AdvertDetailStoreService,
  AdvertForm,
  AdvertFormApiService,
  AdvertSelectedStoreService,
  CommentTree,
} from '@features';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ProgressSpinner } from 'primeng/progressspinner';
import { responsiveOptions } from './contants';
import { Modal, PhonePipe } from '@shared';
import { UserStoreService } from '@entities';

@Component({
  selector: 'app-advert-detail',
  imports: [
    Button,
    CurrencyPipe,
    Skeleton,
    GalleriaModule,
    Modal,
    PhonePipe,
    CommentTree,
    InputText,
    ReactiveFormsModule,
    AutoComplete,
    CascadeSelect,
    FileUpload,
    InputMask,
    InputNumber,
    Textarea,
    AdvertForm,
    ProgressSpinner,
    RouterLink,
  ],
  templateUrl: './advert-detail.html',
  styleUrl: './advert-detail.scss',
  standalone: true,
})
export class AdvertDetail implements OnInit {
  // Services
  private readonly advertSelectedStoreService = inject(
    AdvertSelectedStoreService,
  );
  private readonly advertDetailService = inject(AdvertDetailService);
  readonly advertDetailStoreService = inject(AdvertDetailStoreService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userStoreService = inject(UserStoreService);
  private readonly advertService = inject(AdvertFormApiService);

  // Variables
  readonly advertLoading = signal(false);
  readonly deleteLoading = signal(false);
  readonly createCommentLoading = signal(false);
  readonly activeEditId = model<string | null>(null);
  readonly activeReplyId = model<string | null>(null);
  readonly userId = this.userStoreService.user()?.userId;
  private readonly id = this.activatedRoute.snapshot.params['id'];

  private readonly advertId =
    this.advertDetailStoreService.advertDetail()?.advert.id ?? this.id;

  readonly isPhoneModalOpen = signal(false);
  readonly isAdvertEdit = signal(false);
  readonly responsiveOptions = responsiveOptions;

  createCommentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createCommentForm = formBuilder.group({
      createComment: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    const id = this.advertSelectedStoreService.advertSelected()?.id ?? this.id;
    this.advertLoading.set(true);
    forkJoin({
      advert: this.advertDetailService.getAdvert(id).pipe(
        catchError((err) => {
          console.error('getAdvert error', err);
          return of(null);
        }),
      ),
      comments: this.advertDetailService.getAdvertComments(id).pipe(
        catchError((err) => {
          console.error('getAdvertComments error', err);
          return of(null);
        }),
      ),
    })
      .pipe(finalize(() => this.advertLoading.set(false)))
      .subscribe();
  }

  openPhoneModal() {
    this.isPhoneModalOpen.set(true);
  }
  editAdvert() {
    this.isPhoneModalOpen.set(true);
  }

  galleryImages = computed(() => {
    const imgs =
      this.advertDetailStoreService.advertDetail()?.advert.imageSrc ?? [];
    return imgs.map((src) => ({
      itemImageSrc: src.src,
      thumbnailImageSrc: src.src,
    }));
  });

  deleteAdvert() {
    this.deleteLoading.set(true);
    this.advertService
      .deleteAdvert(this.advertId)
      .pipe(finalize(() => this.deleteLoading.set(false)))
      .subscribe();
  }

  submitCreateComment() {
    this.createCommentLoading.set(true);
    const advertId =
      this.advertSelectedStoreService.advertSelected()?.id ?? this.id;
    const comment = this.createCommentForm.get('createComment')?.value;
    this.advertDetailService.createAdvertComments(advertId, comment).subscribe({
      next: () => {
        const id =
          this.advertSelectedStoreService.advertSelected()?.id ?? this.id;
        this.advertDetailService
          .getAdvertComments(id)
          .pipe(finalize(() => this.createCommentLoading.set(false)))
          .subscribe();
      },
    });
  }
}
