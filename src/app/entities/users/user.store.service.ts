import { Injectable, signal } from '@angular/core';
import { User } from './domain/user';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private _user = signal<User | null>(null);

  readonly user = this._user.asReadonly();

  setUser(user: User) {
    this._user.set(user);
  }
  reset() {
    this._user.set(null);
  }
}
