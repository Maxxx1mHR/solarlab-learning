import { CanActivateFn } from '@angular/router';
import { AuthorizationStateService } from '@core';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthorizationStateService);
  // return authState.isAuthenticated();
  return !!authState.getState();
};
