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
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header implements OnInit {
  @ViewChild('popoverSettings') popoverSettings!: Popover;
  authMod = signal<'login' | 'register'>('login');
  menuItem = signal<MenuItem[]>([]);

  authorizationSate = inject(AuthorizationStateService);
  authorizationService = inject(AuthorizationService);
  categoriesService = inject(CategoriesService);

  userStore = inject(UserStoreService);

  isLoginModalOpen = false;
  isRegisterModalOpen = false;

  items: MenuItem[] | undefined;

  onCategoryClick(category: Category, fullPath: string) {
    console.log(this.menuItem());
    console.log('Выбрана категория:', category);
    console.log('fullPath:', fullPath);
  }

  mapCategories(
    categories: Category[],
    parentId = '00000000-0000-0000-0000-000000000000',
    parentPath = '',
  ): MenuItem[] {
    return categories
      .filter((cat) => cat.parentId === parentId)
      .map((c) => {
        const fullPath = parentPath ? `${parentPath} / ${c.name}` : c.name;
        const children = this.mapCategories(categories, c.id, fullPath);

        return {
          id: c.id,
          label: c.name,
          items: children.length > 0 ? children : undefined,
          fullPath,
          command: () => this.onCategoryClick(c, fullPath),
        };
      });
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => this.menuItem.set(this.mapCategories(categories)),
    });
  }
  changeAuthMod() {
    this.authMod.update((value) => (value === 'login' ? 'register' : 'login'));
  }
  onLogout() {
    this.authorizationService.logout();
    this.popoverSettings.hide();
  }
}
