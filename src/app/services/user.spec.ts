import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user';
import { UserResponse } from '../models/user-response';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const user: UserResponse = { id: 1, name: 'Ana', dni: '12345678', age: 30, email: 'ana@a.com', roleType: 0 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('getAll hace un GET a /User y devuelve la lista', () => {
    let result: UserResponse[] = [];
    service.getAll().subscribe((users) => (result = users));

    const req = httpMock.expectOne('http://localhost:5224/User');
    expect(req.request.method).toBe('GET');
    req.flush([user]);

    expect(result).toEqual([user]);
    httpMock.verify();
  });

  it('getById hace un GET a /User/{id}', () => {
    let result: UserResponse | undefined;
    service.getById(1).subscribe((u) => (result = u));

    const req = httpMock.expectOne('http://localhost:5224/User/1');
    expect(req.request.method).toBe('GET');
    req.flush(user);

    expect(result).toEqual(user);
    httpMock.verify();
  });

  it('login hace un POST a /User/login con el body correcto', () => {
    const body = { email: 'ana@a.com', password: '123456' };
    service.login(body).subscribe();

    const req = httpMock.expectOne('http://localhost:5224/User/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush({ token: 'abc' });

    httpMock.verify();
  });
});
