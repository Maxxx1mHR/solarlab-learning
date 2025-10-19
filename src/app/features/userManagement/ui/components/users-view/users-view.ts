import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { UsersResponseDto } from '../../../../../infrastructure/users/dto/user.dto';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Button } from 'primeng/button';
import { LoginForm } from '../../../../auth/ui/components/login-form/login-form';
import { Modal } from '../../../../../shared/components/modal/modal';
import { finalize, switchMap } from 'rxjs';

@Component({
  selector: 'app-users-view',
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    CommonModule,
    Paginator,
    Button,
    LoginForm,
    Modal,
  ],
  templateUrl: './users-view.html',
  styleUrl: './users-view.scss',
  standalone: true,
})
export class UsersView implements OnInit {
  private readonly userService = inject(UserService);

  users: UsersResponseDto[] | [] = [];
  selectedUsers: UsersResponseDto[] = [];
  first = 0;
  rows = 10;
  searchString = '';
  isDeleteModalOpen = signal(false);

  readonly deleteLoading = signal(false);

  searchedUser() {
    const searchString = this.searchString.trim().toLowerCase();
    if (!searchString) {
      return this.users;
    }
    return this.users.filter((user) => user.name.includes(searchString));
  }

  selectedNames() {
    return this.selectedUsers.map((user) => user.name).join(', ');
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  onSearch(searchString: string) {
    this.searchString = searchString;
    this.first = 0;
  }

  pagedUsers() {
    return this.searchedUser().slice(this.first, this.first + this.rows);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  submitDelete() {
    this.deleteLoading.set(true);
    const ids = this.selectedUsers.map((user) => user.id);
    this.userService.deleteUser(ids).subscribe({
      next: () => {
        this.loadUsers();
        this.selectedUsers = [];
        this.deleteLoading.set(false);
        this.isDeleteModalOpen.set(false);
        this.first = 0;
      },
    });
  }

  ngOnInit() {
    this.loadUsers();
  }
}
