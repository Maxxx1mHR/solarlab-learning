import { Component, inject } from '@angular/core';
import { ProductCard } from './product-card';
import { AdvertSearchStoreService } from '@features';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss',
  standalone: true,
})
export class ProductsList {
  advertSearchStoreService = inject(AdvertSearchStoreService);
}
