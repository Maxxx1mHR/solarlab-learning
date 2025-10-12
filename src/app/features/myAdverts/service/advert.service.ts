import { computed, inject, Injectable } from '@angular/core';
import { AdvertApiService, ImagesApiService } from '@infrastructure';
import { UserStoreService } from '../../../entries/users/user.store.service';
import { forkJoin, map, of, switchMap, tap } from 'rxjs';
import { mapAdvertResponseDtoToAdvert } from '../adapters/advert-adapter';
import { AdvertStoreService } from './advert.store.service';

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
export class AdvertService {
  advertApiService = inject(AdvertApiService);
  userStoreService = inject(UserStoreService);
  advertStoreService = inject(AdvertStoreService);
  private readonly imagesApiService = inject(ImagesApiService);

  // tap((adverts) => this.advertStoreService.setAdverts(adverts)),

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

        console.log('rfrf', adverts);

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
      tap((res) => console.log('777', res)),
      tap((adverts) => this.advertStoreService.setAdverts(adverts)),
    );
  }
}
