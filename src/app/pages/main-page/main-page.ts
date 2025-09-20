import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsList } from './products-list/products-list';

@Component({
  selector: 'app-main',
  imports: [CommonModule, ProductsList],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  standalone: true,
})
export class MainPage {}
