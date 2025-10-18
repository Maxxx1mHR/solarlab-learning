import { inject, Injectable } from '@angular/core';
import { AdvertApiService, ImagesApiService } from '@infrastructure';
import { Router } from '@angular/router';
import { forkJoin, of, switchMap, tap } from 'rxjs';
import { AuthorizationService } from '@core';

@Injectable({
  providedIn: 'root',
})
export class AdvertFormApiService {
  private advertApiService = inject(AdvertApiService);
  private router = inject(Router);
  private readonly authorizationService = inject(AuthorizationService);

  // TODO вынетси в отдельный сервис
  private imagesApiService = inject(ImagesApiService);

  createAdvert(data: FormData) {
    return this.advertApiService
      .createAdvert(data)
      .pipe(
        tap((advertResponse) =>
          this.router.navigate([`/adverts/${advertResponse.id}`]),
        ),
      );
  }

  deleteAdvert(id: string) {
    return this.advertApiService.deleteAdvert(id).pipe(
      switchMap(() => this.authorizationService.currentUser()),
      tap(() => this.router.navigate([`/my-adverts`])),
    );
  }

  updateAdvert(deleteImgId: string[], advertId: string, data: FormData) {
    const request = (deleteImgId?.length ? deleteImgId : [null]).map((id) =>
      id ? this.imagesApiService.deleteImages(id) : of(null),
    );
    console.log(advertId);

    return forkJoin(request).pipe(
      switchMap(() =>
        this.advertApiService
          .updateAdvert(advertId, data)
          .pipe(tap(() => this.router.navigate([`/adverts/${advertId}`]))),
      ),
    );
  }
}
