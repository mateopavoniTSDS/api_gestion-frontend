import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { UserList } from './components/user-list/user-list';
import { UserDetail } from './components/user-detail/user-detail';
import { UserForm } from './components/user-form/user-form';
import { authGuard } from './auth-guard';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, title: 'Iniciar sesión' },
  {
    path: 'home',
    component: Home,
    title: 'Inicio',
    canActivate: [authGuard],
    children: [
      { path: '', component: UserList, data: { titulo: 'Usuarios' } },
      { path: 'users/new', component: UserForm },
      { path: 'users/:id/edit', component: UserForm },
      { path: 'users/:id/:field', component: UserDetail },
      { path: 'users/:id', component: UserDetail },
    ],
  },
  { path: 'not-found', component: NotFound, title: 'No encontrada' },
  { path: '**', component: NotFound, title: 'No encontrada' },
];
