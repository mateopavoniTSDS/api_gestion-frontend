import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest, map, startWith } from 'rxjs';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink, ReactiveFormsModule, FormsModule, AsyncPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  titulo = this.route.snapshot.data['titulo'];
  filterControl = new FormControl('', { nonNullable: true });
  searchId: number | null = null;

  sort$ = this.route.queryParamMap.pipe(map((p) => p.get('sort')));
  filter$ = this.filterControl.valueChanges.pipe(startWith(''));

  users$ = combineLatest([this.userService.getAll(), this.sort$, this.filter$]).pipe(
    map(([users, sort, filter]) => {
      const list = users.filter((u) => u.name.toLowerCase().includes(filter.toLowerCase()));
      if (sort === 'name') {
        list.sort((a, b) => a.name.localeCompare(b.name));
      }
      return list;
    }),
  );

  searchById() {
    this.router.navigate(['/home/users', this.searchId]);
  }
}
