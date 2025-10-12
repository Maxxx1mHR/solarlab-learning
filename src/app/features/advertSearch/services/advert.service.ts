import { inject, Injectable } from '@angular/core';
import {
  AdvertApiService,
  AdvertSearchRequestDto,
  ImagesApiService,
} from '@infrastructure';
import { AdvertSearchStoreService } from './advert-search.store.service';
import {
  catchError,
  finalize,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { mapAdvertSearchDtoToProductList } from '../adapters/product-list.adapter';
import { Product } from '../domain/product';
import { MessageService } from 'primeng/api';
import { AdvertSelectedStoreService } from '../../advertDetail/services/advert-selected.store.service';

@Injectable({
  providedIn: 'root',
})
export class AdvertService {
  private readonly advertApiService = inject(AdvertApiService);
  private readonly advertSearchStoreService = inject(AdvertSearchStoreService);
  private readonly imagesApiService = inject(ImagesApiService);
  private readonly advertSelectedStoreService = inject(
    AdvertSelectedStoreService,
  );
  private messageService = inject(MessageService);

  advertSearch(data: AdvertSearchRequestDto): Observable<Product[]> {
    this.advertSearchStoreService.setLoading(true);

    return this.advertApiService.advertSearch(data).pipe(
      map((advertDto) => mapAdvertSearchDtoToProductList(advertDto)),
      switchMap((products) => {
        if (!products || products.length === 0) return of([]);
        const requests = products.map((product) =>
          product.imageSrc
            ? this.imagesApiService.getImages(product.imageSrc)
            : of(null),
        );

        return forkJoin(requests).pipe(
          map((imagesByProduct) =>
            products.map((product, index) => ({
              ...product,
              imageSrc: imagesByProduct[index]
                ? URL.createObjectURL(imagesByProduct[index])
                : 'assets/images/no-image.png',
            })),
          ),
        );
      }),
      tap((products: Product[]) =>
        this.advertSearchStoreService.setAdvertSearchResult(products),
      ),
      catchError((err) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Ошибка',
          detail: `${err?.error?.errors?.[0]}`,
        });
        return throwError(() => err);
      }),
      finalize(() => this.advertSearchStoreService.setLoading(false)),
    );
  }
}
