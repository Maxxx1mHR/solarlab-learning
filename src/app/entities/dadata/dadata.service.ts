import { inject, Injectable } from '@angular/core';
import { DadataApiService } from '../../infrastructure/dadata/services/dadata.api.service';
import { DadataStoreService } from './dadata.store.service';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DadataService {
  private readonly apiService = inject(DadataApiService);
  private readonly dadataStoreService = inject(DadataStoreService);

  getAddressSuggestion(params: { query: string }) {
    return this.apiService
      .getAddressSuggestion(params)
      .pipe(
        map((addresses) =>
          this.dadataStoreService.setAddressSuggestion(
            addresses.suggestions.map((value) => value.value),
          ),
        ),
      );
  }
}
