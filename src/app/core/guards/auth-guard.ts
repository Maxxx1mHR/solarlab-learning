import { CanActivateFn } from '@angular/router';
import { AuthorizationStateService } from '@core';
import { inject } from '@angular/core';
import { UserStoreService } from '../../entries/users/user.store.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authState = inject(AuthorizationStateService);
  // return authState.isAuthenticated();
  return !!authState.getState();
};

export const AdminGuard: CanActivateFn = () => {
  const userStoreService = inject(UserStoreService);

  return userStoreService.user()?.role === 'Admin';
};
