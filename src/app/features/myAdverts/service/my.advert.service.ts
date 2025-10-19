import { inject, Injectable } from '@angular/core';
import { AdvertApiService, ImagesApiService } from '@infrastructure';
import { forkJoin, map, of, switchMap, tap } from 'rxjs';
import { mapAdvertResponseDtoToAdvert } from '../adapters/advert-adapter';
import { MyAdvertStoreService } from './my.advert.store.service';
import { Router } from '@angular/router';

interface Advert {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  isActive: boolean;
  imagesIds: string[];
  cost: number;
}

@Injectable({
  providedIn: 'root',
})
export class MyAdvertService {
  advertApiService = inject(AdvertApiService);
  advertStoreService = inject(MyAdvertStoreService);
  private readonly imagesApiService = inject(ImagesApiService);
  private router = inject(Router);

  getMyAdverts(adverts: Advert[]) {
    const request = adverts.map((advert) =>
      this.advertApiService
        .getAdvert(advert.id)
        .pipe(map((advert) => mapAdvertResponseDtoToAdvert(advert))),
    );

    return forkJoin(request).pipe(
      switchMap((adverts) => {
        const requestImage = adverts.map((advert) =>
          advert.imageSrc
            ? this.imagesApiService.getImages(advert.imageSrc)
            : of(null),
        );

        return forkJoin(requestImage).pipe(
          map((advertImages) =>
            adverts.map((advert, index) => ({
              ...advert,
              imageSrc: advertImages[index]
                ? URL.createObjectURL(advertImages[index])
                : 'assets/images/no-image.png',
            })),
          ),
        );
      }),
      tap((adverts) => this.advertStoreService.setAdverts(adverts)),
    );
  }
}
