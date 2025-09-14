import {Component, inject, Input, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {Popover, PopoverModule} from 'primeng/popover';
import {InputGroup} from 'primeng/inputgroup';
import {InputTextModule} from 'primeng/inputtext';
import {Divider} from 'primeng/divider';
import {CommonModule, NgTemplateOutlet} from '@angular/common';
import {AuthorizationService, AuthorizationStoreService} from '@core';
import {Message} from 'primeng/message';
import {Password} from 'primeng/password';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-auth-form',
  imports: [ButtonModule, CommonModule, NgTemplateOutlet, FormsModule, InputTextModule, PopoverModule, ReactiveFormsModule, InputGroup, Divider, Message, Password, Toast],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
  standalone: true
})
export class AuthForm {
  @Input() popover!: Popover

  private authorizationService = inject(AuthorizationService);
  private authorizationStoreService = inject(AuthorizationStoreService);

  isLoading = this.authorizationStoreService.isLoading

  authMod = signal<'login' | 'register'>('login')

  changeAuthMod() {
    this.authMod.update(value => value === 'login' ? 'register' : 'login')
    console.log(this.authMod())
  }


  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      "login": new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(64)]),
      "password": new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    })

    this.registerForm = formBuilder.group({
      "name": new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(64)]),
      "login": new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(64)]),
      "password": new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    })
  }


  login() {
    this.authorizationService.login(this.loginForm.value).subscribe();
  }

  register() {
    this.authorizationService.register(this.registerForm.value).subscribe();
  }
}
