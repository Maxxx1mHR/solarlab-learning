import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UpdateProfileForm } from '../domain/update.profile';
import { UserStoreService } from '@entities';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileFormService {
  private userStoreService = inject(UserStoreService);
  private fb = inject(FormBuilder);

  isEqual(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const oldPwd = group.get('passwordNew')?.value;
      const newPwd = group.get('passwordRepeat')?.value;

      if (!oldPwd || !newPwd) return null;
      return oldPwd !== newPwd ? { isEqual: true } : null;
    };
  }

  getForm(disabled: boolean): UpdateProfileForm {
    return this.fb.nonNullable.group(
      {
        name: [
          {
            value: this.userStoreService.user()?.name ?? '',
            disabled: disabled,
          },
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(64),
          ],
        ],
        login: [
          {
            value: this.userStoreService.user()?.login ?? '',
            disabled: disabled,
          },
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(64),
          ],
        ],
        passwordNew: [
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

  setForm(): UpdateProfileForm {
    return this.fb.nonNullable.group(
      {
        name: this.userStoreService.user()?.name ?? '',
        login: this.userStoreService.user()?.login ?? '',
        passwordNew: '',
        passwordRepeat: '',
      },
      { validators: [this.isEqual()] },
    );
  }
}
