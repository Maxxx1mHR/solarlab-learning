import { inject, Injectable } from '@angular/core';
import { UserApiService } from '../../infrastructure/users/services/user.api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiService = inject(UserApiService);

  getUsers() {
    return this.userApiService.getUsers();
  }

  deleteUser(id: string) {
    return this.userApiService.deleteUser(id);
  }
}
