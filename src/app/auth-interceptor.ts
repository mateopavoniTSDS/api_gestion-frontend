import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    tap({
      error: (err) => {
        // el 401 del login es "credenciales incorrectas", no sesión vencida
        if (err.status === 401 && !req.url.endsWith('/login')) {
          localStorage.removeItem('token');
          router.navigate(['/login']);
        }
      },
    }),
  );
};
