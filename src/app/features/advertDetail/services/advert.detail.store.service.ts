import { Injectable, signal } from '@angular/core';
import { AdvertDetail } from '../domain/advert.detail';

@Injectable({
  providedIn: 'root',
})
export class AdvertDetailStoreService {
  advertDetail = signal<AdvertDetail | null>(null);
  isLoading = signal(false);

  setAdvertDetail(advertDetail: AdvertDetail) {
    this.advertDetail.set(advertDetail);
  }

  setLoading(state: boolean) {
    this.isLoading = signal(state);
  }
}
