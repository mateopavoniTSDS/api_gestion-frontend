import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { UserList } from './user-list/user-list';
import { UserDetail } from './user-detail/user-detail';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, title: 'Iniciar sesión' },
  {
    path: 'home',
    component: Home,
    title: 'Inicio',
    children: [
      { path: '', component: UserList },
      { path: 'users/:id', component: UserDetail },
    ],
  },
  { path: '**', component: NotFound, title: 'No encontrada' },
];
