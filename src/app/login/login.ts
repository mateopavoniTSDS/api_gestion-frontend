import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  token = signal('');
  error = signal('');

  constructor(private userService: UserService) {}

  login() {
    this.error.set('');
    this.token.set('');

    this.userService.login(this.loginForm.value as any).subscribe({
      next: (res) => this.token.set(res.token),
      error: () => this.error.set('Credenciales incorrectas'),
    });
  }
}
