import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login-model';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly API_URL = 'http://localhost:5224/User';

  constructor(private http: HttpClient) {}

  login(login: LoginModel) {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, login);
  }

  getAll() {
    return this.http.get<UserResponse[]>(this.API_URL);
  }

  getById(id: number) {
    return this.http.get<UserResponse>(`${this.API_URL}/${id}`);
  }

  create(user: User) {
    return this.http.post<UserResponse>(this.API_URL, user);
  }

  update(id: number, user: User) {
    return this.http.put<UserResponse>(`${this.API_URL}/${id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
