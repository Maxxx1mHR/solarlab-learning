import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddressSuggestionsResponseDto } from '../dto/address.suggestions.dto';

@Injectable({
  providedIn: 'root',
})
export class DadataApiService {
  private http = inject(HttpClient);

  getAddressSuggestion(params: { query: string }) {
    return this.http.post<AddressSuggestionsResponseDto>(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token 0bfa922b76b9cd528bf42724815c490350534ba5',
        },
      },
    );
  }
}
