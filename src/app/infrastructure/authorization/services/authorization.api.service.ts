import { inject, Injectable } from '@angular/core';
import { environment } from '@environments';
import { HttpClient } from '@angular/common/http';
import { LoginRequestDto } from '../dto/authorization.login.dto';
import { RegisterRequestDto } from '../dto/authorization.register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationApiService {
  private http = inject(HttpClient);
  private base = environment.baseApiURL;

  login(data: LoginRequestDto) {
    return this.http.post<string>(`${this.base}/auth/login`, data);
  }

  register(data: RegisterRequestDto) {
    return this.http.post(`${this.base}/auth/register`, data);
  }
}
