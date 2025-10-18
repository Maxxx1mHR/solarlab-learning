import { Injectable, signal } from '@angular/core';
import { Advert } from '../domain/advert';

@Injectable({
  providedIn: 'root',
})
export class MyAdvertStoreService {
  private readonly _adverts = signal<Advert[]>([]);
  readonly adverts = this._adverts.asReadonly();

  setAdverts(adverts: Advert[]) {
    this._adverts.set(adverts);
  }
}
