import { inject, Injectable } from '@angular/core';
import {
  AuthorizationApiService,
  LoginRequestDto,
  RegisterRequestDto,
} from '@infrastructure';
import {
  catchError,
  finalize,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthorizationStateService } from './authorization.state.service';
import { AuthorizationStoreService } from './authorization.store.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserApiService } from '../../../infrastructure/users/services/user.api.service';
import { mapUserDtoToUser } from '../../../entries/users/adapters/user.adapter';
import { UserStoreService } from '../../../entries/users/user.store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private readonly apiService = inject(AuthorizationApiService);
  private readonly authStateService = inject(AuthorizationStateService);
  private readonly authStoreService = inject(AuthorizationStoreService);
  private readonly userApiService = inject(UserApiService);
  private readonly userStoreService = inject(UserStoreService);
  private readonly router = inject(Router);
  private messageService = inject(MessageService);

  login(data: LoginRequestDto) {
    this.authStoreService.setLoading(true);

    return this.apiService.login(data).pipe(
      tap((response) => {
        this.authStoreService.setAuthToken(response);
      }),
      switchMap(() =>
        this.userApiService.getCurrentUser().pipe(map(mapUserDtoToUser)),
      ),
      tap((user) => {
        this.userStoreService.setUser(user);
        this.userApiService.getCurrentUser();
        this.authStateService.setState(true);
        this.messageService.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Вы вошли в систему',
        });
      }),
      catchError((err) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Ошибка',
          detail: `${err?.error?.errors?.[0]}`,
        });
        return throwError(() => err);
      }),
      finalize(() => this.authStoreService.setLoading(false)),
    );
  }

  logout() {
    this.authStateService.setState(false);
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  register(data: RegisterRequestDto) {
    return this.apiService.register(data).pipe();
    tap((data) => console.log('>>', data));
  }
}
