import {
  Component,
  computed,
  effect,
  inject,
  model,
  OnInit,
} from '@angular/core';
import { Button } from 'primeng/button';
import { AdvertSelectedStoreService } from '../../../services/advert-selected.store.service';
import { CurrencyPipe } from '@angular/common';
import { AdvertDetailService } from '../../../services/advert.detail.service';
import { AdvertDetailStoreService } from '../../../services/advert.detail.store.service';
import { Skeleton } from 'primeng/skeleton';
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { LoginForm } from '../../../../../shared/components/smart/header/login-form/login-form';
import { Modal } from '../../../../../shared/components/dump/modal/modal';
import { PhonePipe } from '../../../../../shared/pipes/phone-pipe';
import { CommentTree } from '../../../../advertComments/ui/components/comment-tree/comment-tree';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { UserStoreService } from '../../../../../entries/users/user.store.service';
import { AdvertService } from '../../../../myAdverts/service/advert.service';
import { AutoComplete } from 'primeng/autocomplete';
import { CascadeSelect } from 'primeng/cascadeselect';
import { FileUpload } from 'primeng/fileupload';
import { InputMask } from 'primeng/inputmask';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { AdvertCreateForm } from '../../../../advertCreateForm/ui/components/advert-create-form/advert-create-form';

@Component({
  selector: 'app-advert-detail',
  imports: [
    Button,
    CurrencyPipe,
    Skeleton,
    GalleriaModule,
    LoginForm,
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
    AdvertCreateForm,
  ],
  templateUrl: './advert-detail.html',
  styleUrl: './advert-detail.scss',
  standalone: true,
})
export class AdvertDetail implements OnInit {
  advertSelectedStoreService = inject(AdvertSelectedStoreService);
  advertDetailService = inject(AdvertDetailService);
  advertDetailStoreService = inject(AdvertDetailStoreService);
  private activatedRoute = inject(ActivatedRoute);
  userStoreService = inject(UserStoreService);
  advertService = inject(AdvertService);

  activeEditId = model<string | null>(null);
  activeReplyId = model<string | null>(null);

  userId = this.userStoreService.getUser()?.userId;

  public id = this.activatedRoute.snapshot.params['id'];

  advertId = this.advertDetailStoreService.advertDetail()?.advert.id ?? this.id;

  isPhoneModalOpen = false;

  isEdit = false;

  createCommentForm: FormGroup;

  updateAdvertForm: FormGroup;

  responsiveOptions = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.createCommentForm = formBuilder.group({
      createComment: new FormControl('', [Validators.required]),
    });

    const advert = this.advertDetailStoreService.advertDetail()?.advert;

    console.log(advert);

    this.updateAdvertForm = formBuilder.group({
      name: new FormControl('123', [Validators.required]),
      description: new FormControl(''),
      images: new FormControl(''),
      cost: new FormControl(0, [Validators.required]),
      email: new FormControl(''),
      phone: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
    });

    effect(() => {
      const detail = this.advertDetailStoreService.advertDetail(); // signal
      if (!detail) return;

      const a = detail.advert;
      this.updateAdvertForm.reset(
        {
          name: a.title ?? '',
          description: a.description ?? '',
          // images: a.imagesIds ?? [],
          // cost: a.cost ?? 0,
          // email: a.email ?? '',
          // phone: a.phone ?? '',
          // location: a.location ?? '',
          // categoryId: a.category?.id ?? '',
        },
        { emitEvent: false },
      );
    });
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
    this.advertService.deleteMyAdvert(this.advertId).subscribe();
  }

  ngOnInit() {
    console.log('!!!', this.userStoreService.getUser());

    const id = this.advertSelectedStoreService.advertSelected()?.id ?? this.id;
    if (id) {
      this.advertDetailService.getAdvert(id).subscribe();
      this.advertDetailService.getAdvertComments(id).subscribe();
    }
  }

  submitCreateComment() {
    const advertId =
      this.advertSelectedStoreService.advertSelected()?.id ?? this.id;
    const comment = this.createCommentForm.get('createComment')?.value;
    this.advertDetailService.createAdvertComments(advertId, comment).subscribe({
      next: () => {
        const id =
          this.advertSelectedStoreService.advertSelected()?.id ?? this.id;
        this.advertDetailService.getAdvertComments(id).subscribe();
      },
    });
  }

  updateAdvertSubmit() {
    console.log('submit update');
  }
}
