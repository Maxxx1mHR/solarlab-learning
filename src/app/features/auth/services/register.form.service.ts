import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TRegisterForm } from '../domain/register.type';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormService {
  private readonly fb = inject(FormBuilder);

  isEqual(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const oldPwd = group.get('password')?.value;
      const newPwd = group.get('passwordRepeat')?.value;

      if (!oldPwd || !newPwd) return null;
      return oldPwd !== newPwd ? { isEqual: true } : null;
    };
  }

  getForm(): TRegisterForm {
    return this.fb.nonNullable.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(64),
          ],
        ],
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
        passwordRepeat: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
          ],
        ],
      },
      { validators: [this.isEqual()] },
    );
  }
}
