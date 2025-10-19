import { Component, inject, Input } from '@angular/core';
import { Product } from './advert-card.types';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AdvertSelectedStoreService } from '../../features/advertDetail/services/advert.selected.store.service';
import { UserStoreService } from '../users/user.store.service';
import { DateCustomPipe } from '../../shared/pipes/date-custom-pipe';
import { AuthorizationService } from '@core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-advert-card',
  imports: [RouterLink, CurrencyPipe, DateCustomPipe],
  templateUrl: './advert-card.html',
  styleUrl: './advert-card.scss',
  standalone: true,
})
export class AdvertCard {
  // @Input() product!: Product;
  advertSelectedStoreService = inject(AdvertSelectedStoreService);
  readonly userStoreService = inject(UserStoreService);
  readonly authorizationService = inject(AuthorizationService);
  private messageService = inject(MessageService);

  @Input() advert!: Product;

  onSelectProduct(product: Product) {
    this.advertSelectedStoreService.setAdvertSelected(product);
    if (!this.userStoreService.user()?.role) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: `Для просмотра объявления требуется авторизация`,
      });
    }
  }
}
