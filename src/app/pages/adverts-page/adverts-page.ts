import { Component, inject } from '@angular/core';
import { AdvertSearchStoreService } from '@features';
import { ProgressSpinner } from 'primeng/progressspinner';
import { AdvertsList, NotFound } from '@widgets';
import { AdvertSearch } from '../../features/advertSearch/ui/components/advert-search/advert-search';

@Component({
  selector: 'app-adverts-page',
  imports: [NotFound, AdvertsList, ProgressSpinner, AdvertsList, AdvertSearch],
  templateUrl: './adverts-page.html',
  styleUrl: './adverts-page.scss',
  standalone: true,
})
export class AdvertsPage {
  advertSearchStoreService = inject(AdvertSearchStoreService);
}
