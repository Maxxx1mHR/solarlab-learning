import { Component, computed, inject, model, OnInit } from '@angular/core';
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

  activeEditId = model<string | null>(null);
  activeReplyId = model<string | null>(null);

  public id = this.activatedRoute.snapshot.params['id'];

  isPhoneModalOpen = false;

  createCommentForm: FormGroup;

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
  }

  galleryImages = computed(() => {
    const imgs =
      this.advertDetailStoreService.advertDetail()?.advert?.imageSrc ?? [];
    return (imgs as string[]).map((src) => ({
      itemImageSrc: src,
      thumbnailImageSrc: src,
    }));
  });

  ngOnInit() {
    const id = this.advertSelectedStoreService.advertSelected()?.id ?? this.id;
    if (id) {
      console.log('123', id);
      console.log(
        'this.advertDetailStoreService',
        this.advertDetailStoreService.advertDetail(),
      );
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
}
