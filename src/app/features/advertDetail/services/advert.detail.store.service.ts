import { Injectable, signal } from '@angular/core';
import { AdvertDetail } from '../domain/advert.detail';
import { CommentNode } from '../domain/advert.comments';

@Injectable({
  providedIn: 'root',
})
export class AdvertDetailStoreService {
  advertDetail = signal<AdvertDetail | null>(null);
  advertComments = signal<CommentNode[] | null>(null);

  setAdvertDetail(advertDetail: AdvertDetail) {
    this.advertDetail.set(advertDetail);
  }

  setAdvertComments(advertComments: CommentNode[]) {
    this.advertComments.set(advertComments);
  }
}
