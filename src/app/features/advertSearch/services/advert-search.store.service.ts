import { Injectable, signal } from '@angular/core';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root',
})
export class AdvertSearchStoreService {
  advertSearchResult = signal<Product[] | null>(null);

  isSearched = signal(false);

  isLoading = signal(false);

  setAdvertSearchResult(advertSearchResult: Product[]) {
    this.advertSearchResult.set(advertSearchResult);
  }

  setLoading(state: boolean) {
    this.isLoading = signal(state);
  }

  setSearched(state: boolean) {
    this.isSearched = signal(state);
  }
}
