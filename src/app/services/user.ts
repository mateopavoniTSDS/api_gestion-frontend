import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login-model';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly API_URL = 'http://localhost:5224/User';

  constructor(private http: HttpClient) {}

  login(login: LoginModel) {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, login);
  }
}
