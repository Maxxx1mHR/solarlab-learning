import { Component, inject, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';
import { RegisterForm } from './register-form/register-form';
import { LoginForm } from './login-form/login-form';
import { Divider } from 'primeng/divider';
import { Modal } from '../../dump/modal/modal';
import { AuthorizationService, AuthorizationStateService } from '@core';
import { UserStoreService } from '../../../../entries/users/user.store.service';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';

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
    Modal,
    InputGroup,
    InputGroupAddon,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  @ViewChild('popoverSettings') popoverSettings!: Popover;
  authMod = signal<'login' | 'register'>('login');

  authorizationSate = inject(AuthorizationStateService);
  authorizationService = inject(AuthorizationService);

  userStore = inject(UserStoreService);

  isLoginModalOpen = false;
  isRegisterModalOpen = false;

  changeAuthMod() {
    this.authMod.update((value) => (value === 'login' ? 'register' : 'login'));
  }
  onLogout() {
    this.authorizationService.logout();
    this.popoverSettings.hide();
  }
}
