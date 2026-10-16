import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, title: 'Iniciar sesión' },
  { path: 'home', component: Home, title: 'Inicio' },
  { path: '**', component: NotFound, title: 'No encontrada' },
];
