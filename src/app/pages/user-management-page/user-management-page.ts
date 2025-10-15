import { Component } from '@angular/core';
import { UsersView } from '../../features/userManagement/ui/components/users-view/users-view';

@Component({
  selector: 'app-user-management-page',
  imports: [UsersView],
  templateUrl: './user-management-page.html',
  styleUrl: './user-management-page.scss',
  standalone: true,
})
export class UserManagementPage {}
