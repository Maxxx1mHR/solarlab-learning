import {
  Component,
  EventEmitter,
  inject,
  Input,
  output,
  Output,
  signal,
} from '@angular/core';
import { AuthorizationService, AuthorizationStoreService } from '@core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import { Popover } from 'primeng/popover';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterFormService } from '../../../services/register.form.service';
import { TRegisterForm } from '../../../domain/register.type';
import { mapRegisterFormToDto } from '../../../adapters/register.adapter';
import { finalize } from 'rxjs';
import { ValidationMessage } from '@shared';

@Component({
  selector: 'app-register-form',
  imports: [
    Button,
    Message,
    Password,
    ReactiveFormsModule,
    InputTextModule,
    ValidationMessage,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
  standalone: true,
})
export class RegisterForm {
  private authorizationService = inject(AuthorizationService);
  private readonly registerFormService = inject(RegisterFormService);

  // Variables
  readonly registerForm: TRegisterForm = this.registerFormService.getForm();
  readonly isRegisterLoading = signal(false);

  readonly closeModal = output<void>();

  register() {
    this.isRegisterLoading.set(true);
    this.authorizationService
      .register(mapRegisterFormToDto(this.registerForm))
      .pipe(finalize(() => this.isRegisterLoading.set(false)))
      .subscribe({
        next: () => {
          this.closeModal.emit();
          this.registerForm.reset();
        },
      });
  }
}
