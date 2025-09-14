import {inject, Injectable} from '@angular/core';
import {AuthorizationApiService, LoginRequestDto, RegisterRequestDto} from '@infrastructure';
import {catchError, finalize, of, tap, throwError} from 'rxjs';
import {AuthorizationStateService} from './authorization.state.service';
import {AuthorizationStoreService} from './authorization.store.service';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private readonly apiService = inject(AuthorizationApiService)
  private readonly authStateService = inject(AuthorizationStateService)
  private readonly authStoreService = inject(AuthorizationStoreService)
  private messageService = inject(MessageService);

  login(data: LoginRequestDto) {
    this.authStoreService.setLoading(true)

    return this.apiService.login(data).pipe(
      tap(response => {
        this.authStateService.setState(true)
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Вы вошли в систему'
        });
      }),
      catchError(err => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Ошибка',
          detail: `${err?.error?.errors?.[0]}`
        });
        return of(null);
      }),
      finalize(() => this.authStoreService.setLoading(false))
    )
  }

  register(data: RegisterRequestDto) {
    return this.apiService.register(data).pipe()
    tap(data => console.log('>>', data))
  }
}
