import { computed, inject, Injectable } from '@angular/core';
import { AdvertApiService, ImagesApiService } from '@infrastructure';
import { UserStoreService } from '../../../entities/users/user.store.service';
import { forkJoin, map, of, switchMap, tap } from 'rxjs';
import { mapAdvertResponseDtoToAdvert } from '../adapters/advert-adapter';
import { AdvertStoreService } from './advert.store.service';
import { Router } from '@angular/router';
import { AuthorizationService } from '@core';
import { AdvertCreateRequestDto } from '../../../infrastructure/advert/dto/advert-create.dto';

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
  private router = inject(Router);
  authorizationService = inject(AuthorizationService);

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

  // deleteMyAdvert(id: string) {
  //   console.log('id', id);
  //   return this.advertApiService.deleteAdvert(id).pipe(
  //     switchMap(() => this.authorizationService.currentUser()),
  //     tap(() => this.router.navigate([`/my-adverts`])),
  //   );
  // }

  // updateAdvert(
  //   deleteImgId: string[],
  //   advertId: string,
  //   data: AdvertCreateRequestDto,
  // ) {
  //   const formData = new FormData();
  //   formData.append('name', data.name);
  //   formData.append('cost', String(data.cost));
  //   formData.append('phone', data.phone);
  //   formData.append('location', data.location);
  //   formData.append('categoryId', data.categoryId);
  //
  //   (data.images ?? []).forEach((f: File) => formData.append('images', f));
  //
  //   const request = (deleteImgId?.length ? deleteImgId : [null]).map((id) =>
  //     id ? this.imagesApiService.deleteImages(id) : of(null),
  //   );
  //
  //   return forkJoin(request).pipe(
  //     switchMap(() =>
  //       this.advertApiService
  //         .updateAdvert(advertId, formData)
  //         .pipe(tap(() => this.router.navigate([`/my-adverts`]))),
  //     ),
  //   );
  // }
}
