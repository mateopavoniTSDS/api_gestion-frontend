# api_gestion-frontend

Frontend en Angular 22. Necesita Node 22.22.3 o más nuevo (`nvm use 22`).

## Correr

```bash
npm install
npm start
```

Queda en `http://localhost:4200`. La API tiene que estar corriendo en `http://localhost:5224`.

## Recorrido del login

1. Login (formulario reactivo)
2. `LoginModel`
3. `UserService` (`HttpClient`, `POST /User/login`)
4. `LoginDTO`
5. `UserController`
6. `UserDAO`
7. Entity Framework / MySQL
8. `BCrypt.Verify`
9. `JwtService` genera el token
10. La API responde `{ token }`
11. El front lo guarda en `localStorage`
12. Navega a `/home`

## Rutas

| Ruta | Qué hace |
| --- | --- |
| `/` | Redirige a `/login` |
| `/login` | Formulario de login |
| `/home` | Lista de usuarios (con guard: pide token) |
| `/home/users/new` | Alta de usuario |
| `/home/users/:id/edit` | Edición de usuario |
| `/home/users/:id/:field` | Muestra un solo dato (`name`, `email`, `dni` o `age`) |
| `/home/users/:id` | Detalle del usuario |
| `/not-found` y `**` | Página no encontrada |
