import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments';
import { UserDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private http = inject(HttpClient);
  private base = environment.baseApiURL;

  getCurrentUser() {
    return this.http.get<UserDto>(`${this.base}/users/current`);
  }
}
