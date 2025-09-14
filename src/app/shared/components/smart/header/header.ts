import {Component, inject} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {PopoverModule} from 'primeng/popover';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {AuthForm} from './auth-form/auth-form';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, FormsModule, InputTextModule, PopoverModule, InputGroup, InputGroupAddon, ReactiveFormsModule, AuthForm],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class Header {

}
