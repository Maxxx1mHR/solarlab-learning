import { Component } from '@angular/core';
import { UpdateProfile } from '../../features/updateProfile/ui/components/update-profile/update-profile';

@Component({
  selector: 'app-profile-page',
  imports: [UpdateProfile],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
  standalone: true,
})
export class ProfilePage {}
