import { inject, Injectable } from '@angular/core';
import { environment } from '@environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { ImagesGetByIdRequestDto } from '../dto/images.get-by-id.dto';

@Injectable({
  providedIn: 'root',
})
export class ImagesApiService {
  private base = environment.baseApiURL;
  private http = inject(HttpClient);

  getImages(id: string): Observable<Blob> {
    return this.http.get(`${this.base}/images/${id}`, {
      responseType: 'blob',
    });
  }

  deleteImages(id: string) {
    return this.http.delete(`${this.base}/images/${id}`);
  }
}
