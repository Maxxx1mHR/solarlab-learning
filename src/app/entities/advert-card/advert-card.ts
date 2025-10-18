import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from './advert-card.types';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AdvertSelectedStoreService } from '../../features/advertDetail/services/advert.selected.store.service';
import { UserStoreService } from '../users/user.store.service';

@Component({
  selector: 'app-advert-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './advert-card.html',
  styleUrl: './advert-card.scss',
  standalone: true,
})
export class AdvertCard {
  // @Input() product!: Product;
  advertSelectedStoreService = inject(AdvertSelectedStoreService);
  @Input() advert!: Product;

  onSelectProduct(product: Product) {
    this.advertSelectedStoreService.setAdvertSelected(product);
  }
}
