import { Component } from '@angular/core';
import { AdvertForm } from '@features';

@Component({
  selector: 'app-new-advert-page',
  imports: [AdvertForm],
  templateUrl: './new-advert-page.component.html',
  styleUrl: './new-advert-page.component.scss',
  standalone: true,
})
export class NewAdvertPage {}
