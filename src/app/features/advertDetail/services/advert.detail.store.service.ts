import { Injectable, signal } from '@angular/core';
import { AdvertDetail } from '../domain/advert.detail';
import { CommentNode } from '../domain/advert.comments';

@Injectable({
  providedIn: 'root',
})
export class AdvertDetailStoreService {
  advertDetail = signal<AdvertDetail | null>(null);
  advertComments = signal<CommentNode[] | null>(null);
  isLoading = signal(false);
  commentsLoading = signal(false);

  setAdvertDetail(advertDetail: AdvertDetail) {
    this.advertDetail.set(advertDetail);
  }

  setLoading(state: boolean) {
    this.isLoading = signal(state);
  }

  setCommentsLoading(state: boolean) {
    this.commentsLoading.set(state);
  }
  setAdvertComments(advertComments: CommentNode[]) {
    this.advertComments.set(advertComments);
  }
}
