import { Component } from '@angular/core';
import { UpdateProfile } from '../../features/updateProfile/ui/components/update-profile/update-profile';

@Component({
  selector: 'app-profile',
  imports: [UpdateProfile],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  standalone: true,
})
export class Profile {}
