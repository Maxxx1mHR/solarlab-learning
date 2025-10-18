import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DadataStoreService {
  addressSuggestion = signal<string[]>([]);

  setAddressSuggestion = (address: string[]) => {
    this.addressSuggestion.set(address);
  };

  getAddressSuggestion() {
    return this.addressSuggestion();
  }
}
