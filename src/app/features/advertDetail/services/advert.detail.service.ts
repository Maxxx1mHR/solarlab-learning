import { inject, Injectable } from '@angular/core';
import { finalize, forkJoin, map, switchMap, tap } from 'rxjs';
import { AdvertSelectedStoreService } from '@features';
import { AdvertApiService, ImagesApiService } from '@infrastructure';
import { mapAdvertResponseDtoToAdvertDetail } from '../adapters/advert-detail.adapter';
import { AdvertDetailStoreService } from './advert.detail.store.service';

@Injectable({
  providedIn: 'root',
})
export class AdvertDetailService {
  advertApiService = inject(AdvertApiService);
  advertSelectedStoreService = inject(AdvertSelectedStoreService);
  imagesApiService = inject(ImagesApiService);
  advertDetailStoreService = inject(AdvertDetailStoreService);

  getAdvert(id: string) {
    this.advertDetailStoreService.setLoading(true);

    return this.advertApiService.getAdvert(id).pipe(
      map((advertDto) => mapAdvertResponseDtoToAdvertDetail(advertDto)),
      switchMap((advert) => {
        const request = advert.advert.imageSrc.map((img) =>
          this.imagesApiService.getImages(img),
        );

        return forkJoin(request).pipe(
          map((response) => {
            const images = response.map((img) => URL.createObjectURL(img));
            return {
              ...advert,
              advert: {
                ...advert.advert,
                imageSrc: images,
              },
            };
          }),
        );
      }),
      tap((result) => this.advertDetailStoreService.setAdvertDetail(result)),
      finalize(() => this.advertDetailStoreService.setLoading(false)),
    );
  }
}
