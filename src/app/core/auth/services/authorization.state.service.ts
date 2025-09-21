import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationStateService {
  private _isAuth = signal(false);
  isAuthenticated = computed(() => this._isAuth());

  getState() {
    return this._isAuth();
  }

  setState(state: boolean): void {
    this._isAuth.set(state);
  }
}
