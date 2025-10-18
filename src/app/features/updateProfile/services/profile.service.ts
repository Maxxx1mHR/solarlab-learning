import { inject, Injectable } from '@angular/core';
import { UserApiService } from '../../../infrastructure/users/services/user.api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userApiService = inject(UserApiService);

  updateUser(id: string, user: FormData) {
    return this.userApiService.updateUser(id, user);
  }
}
