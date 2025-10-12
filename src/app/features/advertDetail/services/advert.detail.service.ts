import { inject, Injectable } from '@angular/core';
import { finalize, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { AdvertSelectedStoreService } from '@features';
import { AdvertApiService, ImagesApiService } from '@infrastructure';
import { mapAdvertResponseDtoToAdvertDetail } from '../adapters/advert-detail.adapter';
import { AdvertDetailStoreService } from './advert.detail.store.service';
import { AdvertCommentResponseDto } from '../../../infrastructure/advert/dto/advert-comments.dto';
import { CommentNode } from '../domain/advert.comments';
import { Images } from '../domain/advert.detail';

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
          this.imagesApiService.getImages(img.src),
        );

        if (advert.advert.imageSrc.length) {
          console.log(advert.advert.imageSrc);
          return forkJoin(request).pipe(
            map((response) => {
              // const images = response.map((img) => URL.createObjectURL(img));
              const images = response.map(
                (img, index): Images => ({
                  src: URL.createObjectURL(img),
                  id: advert.advert.imageSrc[index].id,
                }),
              );

              return {
                ...advert,
                advert: {
                  ...advert.advert,
                  imageSrc: images,
                },
              };
            }),
          );
        } else {
          return of({
            ...advert,
            advert: {
              ...advert.advert,
              imageSrc: [
                {
                  src: 'assets/images/no-image.png',
                  id: '',
                },
              ] as Images[],
            },
          });
        }
      }),
      tap((result) => {
        console.log('???', result);
        this.advertDetailStoreService.setAdvertDetail(result);
      }),
      finalize(() => this.advertDetailStoreService.setLoading(false)),
    );
  }

  mapArr(
    arr: AdvertCommentResponseDto[],
    parentId: string | null = null,
  ): CommentNode[] {
    return arr
      .filter((c) => c.parentId === parentId)
      .map((c) => ({
        ...c,
        replies: this.mapArr(arr, c.id),
      }));
  }

  getAdvertComments(id: string) {
    this.advertDetailStoreService.setCommentsLoading(true);
    return this.advertApiService.getAdvertComments(id).pipe(
      map((comments) => this.mapArr(comments)),
      tap((comment) =>
        this.advertDetailStoreService.setAdvertComments(comment),
      ),
      finalize(() => this.advertDetailStoreService.setCommentsLoading(false)),
    );
  }

  createAdvertComments(
    id: string,
    text: string,
    parendId: string | null = null,
  ) {
    return this.advertApiService.createAdvertComments(id, text, parendId);
  }
}
