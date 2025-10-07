import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments';
import { AdvertSearchRequestDto, AdvertSearchResponseDto } from '../dto';
import { GetAdvertResponseDto } from '../dto/advert-get-by-id.dto';
import { AdvertCommentResponseDto } from '../dto/advert-comments.dto';

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

  getAdvertComments(id: string) {
    return this.http.get<AdvertCommentResponseDto[]>(
      `${this.base}/advert/${id}/comments`,
    );
  }

  createAdvertComments(
    id: string,
    text: string,
    parentId: string | null = null,
  ) {
    const formData = new FormData();
    formData.append('Text', text);
    formData.append('ParentId', parentId ?? '');

    return this.http.post(`${this.base}/advert/${id}/comments`, formData);
  }
}
