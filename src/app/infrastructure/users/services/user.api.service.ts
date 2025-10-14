import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments';
import {
  UpdateUserDtoRequest,
  UpdateUserDtoResponse,
  UserDto,
  UsersResponseDto,
} from '../dto/user.dto';
@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private http = inject(HttpClient);
  private base = environment.baseApiURL;

  getCurrentUser() {
    return this.http.get<UserDto>(`${this.base}/users/current`);
  }

  updateUser(id: string, user: FormData) {
    return this.http.put<UpdateUserDtoResponse>(
      `${this.base}/users/${id}`,
      user,
    );
  }

  getUsers() {
    return this.http.get<UsersResponseDto[]>(`${this.base}/users`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.base}/users/${id}`);
  }
}
