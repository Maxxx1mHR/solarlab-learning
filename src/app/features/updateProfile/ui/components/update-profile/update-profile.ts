import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import { UserStoreService } from '../../../../../entities/users/user.store.service';
import { ProfileService } from '../../../services/profile.service';
import { UpdateProfileFormService } from '../../../services/update.profile.form.service';
import { mapUpdateProfileFormToDto } from '../../../adapter/update.profile.adapter';
import { AuthorizationService } from '@core';
import { finalize, switchMap, tap } from 'rxjs';
import { ValidationMessage } from '@shared';

@Component({
  selector: 'app-update-profile',
  imports: [
    ReactiveFormsModule,
    Button,
    InputText,
    Message,
    Password,
    ValidationMessage,
    FormsModule,
  ],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.scss',
  standalone: true,
})
export class UpdateProfile {
  // Services
  readonly userStoreService = inject(UserStoreService);
  private profileService = inject(ProfileService);
  private readonly updateProfileFormService = inject(UpdateProfileFormService);
  private readonly authorizationService = inject(AuthorizationService);

  // Variables
  readonly isEdit = signal(false);
  readonly updateUserForm = this.updateProfileFormService.getForm(false);
  readonly isSubmitLoading = signal(false);

  constructor() {
    effect(() => {
      const editable = this.isEdit();
      if (editable) {
        this.updateUserForm.enable({ emitEvent: false });
      } else {
        this.updateUserForm.disable({ emitEvent: false });
      }
    });
  }

  submitUpdateProfile() {
    this.isSubmitLoading.set(true);
    this.profileService
      .updateUser(
        this.userStoreService.user()?.userId ?? '',
        mapUpdateProfileFormToDto(this.updateUserForm),
      )
      .pipe(
        switchMap(() => this.authorizationService.currentUser()),
        tap(() => {
          this.isEdit.set(false);
          this.updateUserForm.get('passwordNew')?.reset();
          this.updateUserForm.get('passwordRepeat')?.reset();
        }),
        finalize(() => this.isSubmitLoading.set(false)),
      )
      .subscribe();
  }

  onEdit() {
    this.isEdit.set(true);
  }

  onCancel() {
    this.updateUserForm.reset(
      {
        name: this.userStoreService.user()?.name ?? '',
        login: this.userStoreService.user()?.login ?? '',
        passwordNew: '',
        passwordRepeat: '',
      },
      { emitEvent: false },
    );
    this.isEdit.set(false);
  }
}
