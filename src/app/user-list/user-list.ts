import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { UserResponse } from '../models/user-response';
import { UserService } from '../services/user';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.html',
})
export class UserList {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);

  users = signal<UserResponse[]>([]);
  sort = toSignal(this.route.queryParamMap.pipe(map((p) => p.get('sort'))));

  sortedUsers = computed(() => {
    const list = [...this.users()];
    if (this.sort() === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  });

  constructor() {
    this.userService.getAll().subscribe((users) => this.users.set(users));
  }
}
