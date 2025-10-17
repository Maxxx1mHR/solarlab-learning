import { Injectable, signal } from '@angular/core';
import { Product } from '../../../entities/advert-card';

@Injectable({
  providedIn: 'root',
})
export class AdvertSelectedStoreService {
  advertSelected = signal<Product | null>(null);
  isLoading = signal(false);

  setAdvertSelected(advertSelected: Product | null) {
    this.advertSelected.set(advertSelected);
  }
  setLoading(state: boolean) {
    this.isLoading = signal(state);
  }
}
