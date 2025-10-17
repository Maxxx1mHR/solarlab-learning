import { Component, effect, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import { UserApiService } from '../../../../../infrastructure/users/services/user.api.service';
import { UserStoreService } from '../../../../../entities/users/user.store.service';
import { ProfileService } from '../../../services/profile.service';

interface UpdateProfileForm {
  name: FormControl<string | null | undefined>;
  login: FormControl<string | null | undefined>;
  passwordNew: FormControl<string | null | undefined>;
  passwordRepeat: FormControl<string | null | undefined>;
}

@Component({
  selector: 'app-update-profile',
  imports: [ReactiveFormsModule, Button, InputText, Message, Password],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.scss',
  standalone: true,
})
export class UpdateProfile {
  private userStoreService = inject(UserStoreService);
  private profileService = inject(ProfileService);

  isEdit = false;

  user = this.userStoreService.getUser();

  updateUserForm: FormGroup<UpdateProfileForm>;

  notSamePasswordsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const oldPwd = group.get('passwordNew')?.value;
      const newPwd = group.get('passwordRepeat')?.value;

      if (!oldPwd || !newPwd) return null;
      return oldPwd !== newPwd ? { samePassword: true } : null;
    };
  }

  constructor(private formBuilder: FormBuilder) {
    this.updateUserForm = formBuilder.group<UpdateProfileForm>(
      {
        name: new FormControl(this.user?.name, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64),
        ]),
        login: new FormControl(this.user?.login, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64),
        ]),
        passwordNew: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          // this.notSamePasswordsValidator,
        ]),
        passwordRepeat: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          // this.notSamePasswordsValidator,
        ]),
      },
      { validators: [this.notSamePasswordsValidator()] },
    );
  }

  submitUpdateProfile() {
    const name = this.updateUserForm.value.name;
    const login = this.updateUserForm.value.login;
    const password = this.updateUserForm.value.passwordRepeat;

    this.profileService
      .updateUser(this.user?.userId ?? '', {
        name: name ?? '',
        login: login ?? '',
        password: password ?? '',
      })
      .subscribe({
        next: () => {
          this.isEdit = false;
          // this.updateUserForm.reset();
          this.updateUserForm.get('passwordNew')?.reset();
          this.updateUserForm.get('passwordRepeat')?.reset();
        },
      });
  }

  cancel() {
    this.isEdit = false;
    // this.updateUserForm.reset();
    this.updateUserForm.get('passwordNew')?.reset();
    this.updateUserForm.get('passwordRepeat')?.reset();
  }
}
