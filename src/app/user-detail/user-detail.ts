import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserResponse } from '../models/user-response';
import { UserService } from '../services/user';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user = signal<UserResponse | null>(null);
  id = Number(this.route.snapshot.params['id']);
  field = this.route.snapshot.params['field'];

  constructor() {
    this.userService.getById(this.id).subscribe({
      next: (user) => this.user.set(user),
      error: (err) => {
        if (err.status === 404) {
          this.router.navigateByUrl('/not-found', { skipLocationChange: true });
        }
      },
    });
  }
}
