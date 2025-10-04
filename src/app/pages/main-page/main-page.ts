import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsList } from './products-list/products-list';
import { AdvertSearchStoreService } from '@features';
import { ProgressSpinner } from 'primeng/progressspinner';
import { NotFound } from '@shared_components_dump';

@Component({
  selector: 'app-main',
  imports: [CommonModule, ProductsList, ProgressSpinner, NotFound],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  standalone: true,
})
export class MainPage {
  advertSearchStoreService = inject(AdvertSearchStoreService);
}
