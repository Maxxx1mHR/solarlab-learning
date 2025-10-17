import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AvertCreateForm } from '../domain/create-advert';
import { AdvertApiService, ImagesApiService } from '@infrastructure';
import { AdvertCreateRequestDto } from '../../../infrastructure/advert/dto/advert-create.dto';
import { Router } from '@angular/router';
import { forkJoin, of, switchMap, tap } from 'rxjs';
import { AdvertDetailService } from '../../advertDetail/services/advert.detail.service';
import { Images } from '../../advertDetail/domain/advert.detail';
import { AuthorizationService } from '@core';

@Injectable({
  providedIn: 'root',
})
export class CreateAdvertService {
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
          this.router.navigate([`/product/${advertResponse.id}`]),
        ),
      );
  }

  deleteAdvert(id: string) {
    console.log('id', id);
    return this.advertApiService.deleteAdvert(id).pipe(
      switchMap(() => this.authorizationService.currentUser()),
      tap(() => this.router.navigate([`/my-adverts`])),
    );
  }

  // getEditAdvertImages(advertIds: Images[]) {
  //   const request = advertIds.map((advertId) =>
  //     this.imagesApiService.getImages(advertId.id),
  //   );
  //
  //   return forkJoin(request).pipe(
  //     tap((advertResponse) => console.log('Тест', advertResponse)),
  //   );
  // }

  updateAdvert(deleteImgId: string[], advertId: string, data: FormData) {
    const request = (deleteImgId?.length ? deleteImgId : [null]).map((id) =>
      id ? this.imagesApiService.deleteImages(id) : of(null),
    );

    return forkJoin(request).pipe(
      switchMap(() =>
        this.advertApiService
          .updateAdvert(advertId, data)
          .pipe(tap(() => this.router.navigate([`/my-adverts`]))),
      ),
    );
  }
}
