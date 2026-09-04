# api_gestion-frontend

Login en Angular: formulario reactivo, `LoginModel`, `UserService`, `POST /User/login`.

## Correr

```bash
npm install
ng serve
```

Queda en `http://localhost:4200`. Necesita el backend corriendo en `http://localhost:5224` ([api_gestion](https://github.com/mateopavoniTSDS/api_gestion)).

## Probar el login

Hay que crear un usuario primero (instrucciones en el README del backend) y loguearse con esos datos en el formulario. Si las credenciales son incorrectas se muestra un error; si son correctas se muestra el token.
