import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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

@Component({
  selector: 'app-register-form',
  imports: [Button, Message, Password, ReactiveFormsModule, InputTextModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
  standalone: true,
})
export class RegisterForm {
  private authorizationService = inject(AuthorizationService);
  private authorizationStoreService = inject(AuthorizationStoreService);

  isLoading = this.authorizationStoreService.isLoading;

  @Output() closeModal = new EventEmitter<void>();

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(64),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(64),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });
  }

  register() {
    this.authorizationService.register(this.registerForm.value).subscribe({
      next: () => {
        this.closeModal.emit();
        this.registerForm.reset();
      },
    });
  }
}
