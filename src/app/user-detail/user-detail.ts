import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserResponse } from '../models/user-response';
import { UserService } from '../services/user';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink],
  templateUrl: './user-detail.html',
})
export class UserDetail {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user = signal<UserResponse | null>(null);
  error = signal('');

  constructor() {
    const id = Number(this.route.snapshot.params['id']);

    this.userService.getById(id).subscribe({
      next: (user) => this.user.set(user),
      error: (err) => {
        if (err.status === 404) {
          this.error.set('El usuario no existe');
          setTimeout(() => this.router.navigate(['/home']), 2000);
        }
      },
    });
  }
}
