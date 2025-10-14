import { inject, Injectable } from '@angular/core';
import { UserApiService } from '../../../infrastructure/users/services/user.api.service';
import { UpdateUserDtoRequest } from '../../../infrastructure/users/dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userApiService = inject(UserApiService);

  updateUser(id: string, user: UpdateUserDtoRequest) {
    const formData = new FormData();
    formData.append('login', user.login);
    formData.append('name', user.name);
    formData.append('password', user.password);
    return this.userApiService.updateUser(id, formData);
  }
}
