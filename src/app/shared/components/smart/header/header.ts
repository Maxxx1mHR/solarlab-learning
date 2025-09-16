import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { RegisterForm } from './register-form/register-form';
import { LoginForm } from './login-form/login-form';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-header',
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    PopoverModule,
    ReactiveFormsModule,
    RegisterForm,
    LoginForm,
    Divider,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  authMod = signal<'login' | 'register'>('login');

  changeAuthMod() {
    this.authMod.update((value) => (value === 'login' ? 'register' : 'login'));
  }
}
