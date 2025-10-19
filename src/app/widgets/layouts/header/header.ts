import { Component, inject, signal, ViewChild, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';
import { RegisterForm } from '../../../features/auth/ui/components/register-form/register-form';
import { LoginForm } from '../../../features/auth/ui/components/login-form/login-form';
import { Divider } from 'primeng/divider';
import { Modal } from '../../../shared/components/modal/modal';
import { AuthorizationService, AuthorizationStateService } from '@core';
import { UserStoreService } from '../../../entities/users/user.store.service';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { MenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { TieredMenu } from 'primeng/tieredmenu';
import { CategoriesService } from '../../../entities/catergories/categories.service';
import { AdvertSearch } from '../../../features/advertSearch/ui/components/advert-search/advert-search';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { Breadcrumb } from 'primeng/breadcrumb';
import { filter, finalize } from 'rxjs';
import { Menubar } from 'primeng/menubar';
import { buildBreadcrumb, ValidationMessage } from '@shared';
import { Breadcrumbs } from '../../breadcrumbs/breadcrumbs';
interface Category {
  id: string;
  parentId: string;
  name: string;
}
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
    MegaMenu,
    TieredMenu,
    AdvertSearch,
    RouterLink,
    Breadcrumb,
    Menubar,
    Breadcrumbs,
    ValidationMessage,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  @ViewChild('popoverSettings') popoverSettings!: Popover;

  authorizationSate = inject(AuthorizationStateService);
  authorizationService = inject(AuthorizationService);

  userStore = inject(UserStoreService);

  isLoginModalOpen = false;
  isRegisterModalOpen = false;

  onHide() {
    this.popoverSettings.hide();
  }

  onLogout() {
    this.authorizationService.logout();
    this.popoverSettings.hide();
  }
}
