import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { UserResponse } from '../models/user-response';
import { UserService } from '../services/user';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './user-list.html',
})
export class UserList {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  titulo = this.route.snapshot.data['titulo'];
  users = signal<UserResponse[]>([]);
  sort = toSignal(this.route.queryParamMap.pipe(map((p) => p.get('sort'))));

  filterControl = new FormControl('', { nonNullable: true });
  filter = toSignal(this.filterControl.valueChanges, { initialValue: '' });

  searchId: number | null = null;

  sortedUsers = computed(() => {
    const text = this.filter().toLowerCase();
    const list = this.users().filter((u) => u.name.toLowerCase().includes(text));
    if (this.sort() === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  });

  constructor() {
    this.userService.getAll().subscribe((users) => this.users.set(users));
  }

  searchById() {
    this.router.navigate(['/home/users', this.searchId]);
  }
}
