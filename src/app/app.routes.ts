import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    title: 'Список категорий',
    path: '',
    loadComponent: () => import('@pages').then((m) => m.MainPage),
    // data: { breadcrumb: 'Главная' },
  },
  {
    title: 'Подробная информация',
    path: 'product/:id',
    canActivate: [authGuard],
    loadComponent: () => import('@pages').then((m) => m.ProductDetailPage),
    data: { breadcrumb: 'Подробная информация' },
  },
  {
    title: 'Новое объявление',
    path: 'new-advert',
    canActivate: [authGuard],
    loadComponent: () => import('@pages').then((m) => m.NewAdverPage),
    data: { breadcrumb: 'Новое объявление' },
  },
  {
    title: 'Мои объявления',
    path: 'my-adverts',
    canActivate: [authGuard],
    loadComponent: () => import('@pages').then((m) => m.MyAdvertsPage),
    data: { breadcrumb: 'Мои объявления' },
  },
  {
    title: 'Профиль',
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('@pages').then((m) => m.Profile),
    data: { breadcrumb: 'Профиль' },
  },
];
