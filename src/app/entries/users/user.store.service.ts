import { computed, Injectable, signal } from '@angular/core';
import { User } from './domain/user';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private _user = signal<User | null>(null);

  user = computed(() => this._user());

  setUser(user: User) {
    this._user.set(user);
  }
  getUser() {
    return JSON.parse(localStorage.getItem('user') ?? '');
  }
}
