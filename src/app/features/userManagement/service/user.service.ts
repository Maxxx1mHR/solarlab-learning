import { inject, Injectable } from '@angular/core';
import { UserApiService } from '../../../infrastructure/users/services/user.api.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiService = inject(UserApiService);

  getUsers() {
    return this.userApiService.getUsers();
  }

  deleteUser(ids: string[]) {
    const request = ids.map((id) => this.userApiService.deleteUser(id));
    return forkJoin(request);
  }
}
