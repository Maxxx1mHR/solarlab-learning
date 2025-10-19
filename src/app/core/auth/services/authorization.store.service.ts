import { Injectable, signal } from '@angular/core';
import { AuthState } from '../domain/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationStoreService {
  private state = signal<AuthState>({
    isLoading: false,
  });

  private _authToken = signal<string>('');

  setAuthToken(token: string) {
    localStorage.setItem('access_token', token);
    this._authToken.set(token);
  }
}
