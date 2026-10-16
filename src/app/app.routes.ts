import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { UserList } from './user-list/user-list';
import { UserDetail } from './user-detail/user-detail';
import { UserForm } from './user-form/user-form';
import { authGuard } from './auth-guard';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, title: 'Iniciar sesión' },
  {
    path: 'home',
    component: Home,
    title: 'Inicio',
    canActivate: [authGuard],
    children: [
      { path: '', component: UserList },
      { path: 'users/new', component: UserForm },
      { path: 'users/:id/edit', component: UserForm },
      { path: 'users/:id', component: UserDetail },
    ],
  },
  { path: '**', component: NotFound, title: 'No encontrada' },
];
