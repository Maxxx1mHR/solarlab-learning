import { Component, computed, inject, OnInit } from '@angular/core';
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

  public id = this.activatedRoute.snapshot.params['id'];

  isPhoneModalOpen = false;

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
    console.log('!!', id);
    console.log('this', this.id);
    if (id) {
      this.advertDetailService.getAdvert(id).subscribe();
    }

    console.log('-----', this.advertSelectedStoreService.advertSelected());
  }
}
