import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    title: 'Список категорий',
    path: '',
    loadComponent: () => import('@pages').then((m) => m.MainPage),
  },
  {
    title: 'Подробная информация',
    path: 'product/:id',
    canActivate: [authGuard],
    loadComponent: () => import('@pages').then((m) => m.ProductDetailPage),
  },
  {
    title: 'Новое объявление',
    path: 'new-advert',
    canActivate: [authGuard],
    loadComponent: () => import('@pages').then((m) => m.NewAdverPage),
  },
];
