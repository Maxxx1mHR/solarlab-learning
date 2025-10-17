import { Component } from '@angular/core';
import { AdvertCreateForm } from '../../features/advertCreateForm/ui/components/advert-create-form/advert-create-form';

@Component({
  selector: 'app-new-advert-page',
  imports: [AdvertCreateForm],
  templateUrl: './new-advert-page.component.html',
  styleUrl: './new-advert-page.component.scss',
  standalone: true,
})
export class NewAdvertPage {}
