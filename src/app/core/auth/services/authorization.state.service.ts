import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationStateService {
  private _isAuth = signal(false);
  isAuthenticated = computed(() => this._isAuth());

  getState() {
    const accessToken = localStorage.getItem('access_token');

    // return this._isAuth();
    return accessToken;
  }

  setState(state: boolean): void {
    // const accessToken = localStorage.getItem('access_token');
    // localStorage.setItem('AuthorizationState', JSON.stringify(state));
    this._isAuth.set(state);
  }
}
