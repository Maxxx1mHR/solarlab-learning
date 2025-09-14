import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationStateService {
  isAuthenticated = false;

  getState(): boolean {
    return this.isAuthenticated
  }

  setState(state: boolean): void {
    this.isAuthenticated = state
  }
}
