import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments';
import { AdvertSearchRequestDto, AdvertSearchResponseDto } from '../dto';
import { GetAdvertResponseDto } from '../dto/advert-get-by-id.dto';

@Injectable({
  providedIn: 'root',
})
export class AdvertApiService {
  private base = environment.baseApiURL;
  private http = inject(HttpClient);

  advertSearch(data: AdvertSearchRequestDto) {
    return this.http.post<AdvertSearchResponseDto[]>(
      `${this.base}/advert/search`,
      data,
    );
  }
  getAdvert(id: string) {
    return this.http.get<GetAdvertResponseDto>(`${this.base}/advert/${id}`);
  }
}
