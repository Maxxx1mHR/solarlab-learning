import {
  Component,
  EventEmitter,
  inject,
  output,
  Output,
  signal,
} from '@angular/core';
import { AuthorizationService, AuthorizationStoreService } from '@core';
import { ReactiveFormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TLoginForm } from '../../../domain';
import { mapLoginFormToDto } from '../../../adapters/login.adapter';
import { finalize } from 'rxjs';
import { LoginFormService } from '../../../services';
import { ValidationMessage } from '@shared';

@Component({
  selector: 'app-login-form',
  imports: [
    Message,
    Password,
    InputTextModule,
    Button,
    ReactiveFormsModule,
    ValidationMessage,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  standalone: true,
})
export class LoginForm {
  private authorizationService = inject(AuthorizationService);
  private authorizationStoreService = inject(AuthorizationStoreService);
  private readonly loginFormService = inject(LoginFormService);

  // Variables
  readonly loginForm: TLoginForm = this.loginFormService.getForm();
  readonly isLoginLoading = signal(false);

  readonly closeModal = output<void>();

  login() {
    this.isLoginLoading.set(true);
    this.authorizationService
      .login(mapLoginFormToDto(this.loginForm))
      .pipe(finalize(() => this.isLoginLoading.set(false)))
      .subscribe({
        next: () => {
          this.closeModal.emit();
          this.loginForm.reset();
        },
      });
  }
}
