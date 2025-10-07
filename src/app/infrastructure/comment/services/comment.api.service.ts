import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments';

@Injectable({
  providedIn: 'root',
})
export class CommentApiService {
  private base = environment.baseApiURL;
  private http = inject(HttpClient);

  editComment(id: string, text: string) {
    return this.http.put(`${this.base}/comment/${id}`, { text });
  }
  deleteComment(id: string) {
    return this.http.delete(`${this.base}/comment/${id}`);
  }
}
