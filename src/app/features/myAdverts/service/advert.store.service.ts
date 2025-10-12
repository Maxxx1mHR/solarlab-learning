import { computed, Injectable, signal } from '@angular/core';
import { Advert } from '../domain/advert';

@Injectable({
  providedIn: 'root',
})
export class AdvertStoreService {
  private _adverts = signal<Advert[]>([]);

  adverts = computed(() => this._adverts());

  setAdverts(adverts: Advert[]) {
    this._adverts.set(adverts);
  }

  getAdverts() {
    // return this.adverts();
    console.log('===', this.adverts());
    return this.adverts();
  }
}
