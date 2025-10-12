import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from './product-card.types';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AdvertSelectedStoreService } from '../../../../features/advertDetail/services/advert-selected.store.service';
import { UserStoreService } from '../../../../entries/users/user.store.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  standalone: true,
})
export class ProductCard {
  // @Input() product!: Product;
  advertSelectedStoreService = inject(AdvertSelectedStoreService);
  @Input() product!: Product;

  onSelectProduct(product: Product) {
    this.advertSelectedStoreService.setAdvertSelected(product);
  }
}
