import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertSearchStoreService } from '@features';
import { ProgressSpinner } from 'primeng/progressspinner';
import { AdvertsList, NotFound } from '@widgets';

@Component({
  selector: 'app-main',
  imports: [CommonModule, AdvertsList, ProgressSpinner, NotFound],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  standalone: true,
})
export class MainPage {
  // advertSearchStoreService = inject(AdvertSearchStoreService);
}
