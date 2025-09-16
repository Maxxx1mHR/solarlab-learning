import { Component, inject, Input } from '@angular/core';
import { AuthorizationService, AuthorizationStoreService } from '@core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Popover } from 'primeng/popover';

@Component({
  selector: 'app-login-form',
  imports: [Message, Password, InputTextModule, Button, ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  standalone: true,
})
export class LoginForm {
  private authorizationService = inject(AuthorizationService);
  private authorizationStoreService = inject(AuthorizationStoreService);

  isLoading = this.authorizationStoreService.isLoading;

  @Input() popover!: Popover;

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
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

  login() {
    this.authorizationService.login(this.loginForm.value).subscribe({
      next: () => this.popover.hide(),
    });
  }
}
