import { inject, Injectable } from '@angular/core';
import { AdvertApiService, ImagesApiService } from '@infrastructure';
import { Router } from '@angular/router';
import { catchError, forkJoin, of, switchMap, tap, throwError } from 'rxjs';
import { AuthorizationService } from '@core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AdvertFormApiService {
  private advertApiService = inject(AdvertApiService);
  private router = inject(Router);
  private readonly authorizationService = inject(AuthorizationService);
  private messageService = inject(MessageService);

  // TODO вынетси в отдельный сервис
  private imagesApiService = inject(ImagesApiService);

  createAdvert(data: FormData) {
    return this.advertApiService.createAdvert(data).pipe(
      tap((advertResponse) => {
        this.router.navigate([`/adverts/${advertResponse.id}`]);
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Новое объявление добавлено',
        });
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: `${err?.error?.errors?.[0]}`,
        });
        return throwError(() => err);
      }),
    );
  }

  deleteAdvert(id: string) {
    return this.advertApiService.deleteAdvert(id).pipe(
      switchMap(() => this.authorizationService.currentUser()),
      tap(() => {
        this.router.navigate([`/my-adverts`]);
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Объявление обновлено',
        });
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: `${err?.error?.errors?.[0]}`,
        });
        return throwError(() => err);
      }),
    );
  }

  updateAdvert(deleteImgId: string[], advertId: string, data: FormData) {
    const request = (deleteImgId?.length ? deleteImgId : [null]).map((id) =>
      id ? this.imagesApiService.deleteImages(id) : of(null),
    );
    return forkJoin(request).pipe(
      switchMap(() =>
        this.advertApiService
          .updateAdvert(advertId, data)
          .pipe(tap(() => this.router.navigate([`/adverts/${advertId}`]))),
      ),
    );
  }
}
