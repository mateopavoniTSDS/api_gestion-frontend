import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.html',
})
export class UserForm {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = Number(this.route.snapshot.params['id']);
  editing = !!this.id;
  error = signal('');

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    dni: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    age: [0, [Validators.required, Validators.min(1), Validators.max(120)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    roleType: [0],
    // práctica: no se envían a la API
    address: this.fb.nonNullable.group({
      street: [''],
      city: [''],
    }),
    phones: this.fb.array([this.fb.nonNullable.control('')]),
  });

  constructor() {
    if (this.editing) {
      this.userService.getById(this.id).subscribe((user) => this.form.patchValue(user));
    }
  }

  get phones() {
    return this.form.controls.phones as FormArray;
  }

  addPhone() {
    this.phones.push(this.fb.nonNullable.control(''));
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  save() {
    this.error.set('');
    const { name, dni, age, email, password, roleType } = this.form.getRawValue();
    const user = { name, dni, age: Number(age), email, password, roleType: Number(roleType) };

    const request = this.editing
      ? this.userService.update(this.id, user)
      : this.userService.create(user);

    request.subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) =>
        this.error.set(typeof err.error === 'string' ? err.error : 'No se pudo guardar el usuario'),
    });
  }
}
