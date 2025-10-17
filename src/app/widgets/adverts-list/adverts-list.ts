import { Component, inject } from '@angular/core';
import { AdvertSearchStoreService } from '@features';
import { AdvertCard } from '../../entities/advert-card';

@Component({
  selector: 'app-adverts-list',
  imports: [AdvertCard],
  templateUrl: './adverts-list.html',
  styleUrl: './adverts-list.scss',
  standalone: true,
})
export class AdvertsList {
  advertSearchStoreService = inject(AdvertSearchStoreService);
}
