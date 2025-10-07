import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthorizationStoreService } from '@core';
import { inject } from '@angular/core';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authStoreService = inject(AuthorizationStoreService);

  const newReq = req.clone({
    headers: req.headers.append(
      'Authorization',
      // `Bearer ${authStoreService.authToken()}`,
      `Bearer ${localStorage.getItem('access_token')}`,
    ),
  });
  return next(newReq);
}
