import { Injectable, signal } from '@angular/core';
import { Product } from '@entities';

@Injectable({
  providedIn: 'root',
})
export class AdvertSelectedStoreService {
  private readonly _advertSelected = signal<Product | null>(null);
  readonly advertSelected = this._advertSelected.asReadonly();

  setAdvertSelected(advertSelected: Product | null) {
    this._advertSelected.set(advertSelected);
  }
}
