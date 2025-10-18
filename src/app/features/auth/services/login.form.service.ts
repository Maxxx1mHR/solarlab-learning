import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TLoginForm } from '../domain';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  private fb = inject(FormBuilder);

  getForm(): TLoginForm {
    return this.fb.nonNullable.group({
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
    });
  }
}
