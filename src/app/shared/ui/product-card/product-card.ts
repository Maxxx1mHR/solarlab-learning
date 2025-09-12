import {Component, Input} from '@angular/core';
import {Product} from './product-card.types';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  standalone: true
})
export class ProductCard {
  @Input() product!: Product;
}
