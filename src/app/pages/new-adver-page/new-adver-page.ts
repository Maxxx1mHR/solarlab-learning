import { Component } from '@angular/core';
import { AdvertCreateForm } from '../../features/advertCreateForm/ui/components/advert-create-form/advert-create-form';

@Component({
  selector: 'app-new-adver-page',
  imports: [AdvertCreateForm],
  templateUrl: './new-adver-page.html',
  styleUrl: './new-adver-page.scss',
  standalone: true,
})
export class NewAdverPage {}
