import { Component, Input } from '@angular/core';
import { Product } from './product-card.types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  standalone: true,
})
export class ProductCard {
  @Input() product!: Product;
}
