import { Component, inject, signal, ViewChild, OnInit } from '@angular/core';
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
import { MenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { TieredMenu } from 'primeng/tieredmenu';
import { CategoriesService } from '../../../../entries/catergories/categories.service';
import { AdvertSearch } from '../../../../features/advertSearch/ui/components/advert-search/advert-search';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { Breadcrumb } from 'primeng/breadcrumb';
import { filter, finalize } from 'rxjs';
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
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  @ViewChild('popoverSettings') popoverSettings!: Popover;
  authMod = signal<'login' | 'register'>('login');
  // menuItem = signal<MenuItem[]>([]);

  authorizationSate = inject(AuthorizationStateService);
  authorizationService = inject(AuthorizationService);
  categoriesService = inject(CategoriesService);

  userStore = inject(UserStoreService);

  isLoginModalOpen = false;
  isRegisterModalOpen = false;

  items: MenuItem[] | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.items = this.buildBreadcrumb(this.route.root);
      });
  }

  buildBreadcrumb(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: MenuItem[] = [
      { icon: 'pi pi-home', label: 'Главная', routerLink: '/' },
    ],
  ): MenuItem[] {
    const children = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({
          label,
          routerLink: url,
        });
      }

      return this.buildBreadcrumb(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  onLogout() {
    this.authorizationService.logout();
    this.popoverSettings.hide();
  }
}
