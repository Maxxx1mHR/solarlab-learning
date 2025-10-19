import { inject, Injectable } from '@angular/core';
import { UserApiService } from '../../../infrastructure/users/services/user.api.service';
import { catchError, tap, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userApiService = inject(UserApiService);
  private messageService = inject(MessageService);

  updateUser(id: string, user: FormData) {
    return this.userApiService.updateUser(id, user).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Профиль обновлен',
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
}
