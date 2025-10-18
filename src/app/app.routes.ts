import { Routes } from '@angular/router';
import { AdminGuard, authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    title: 'Главная',
    path: '',
    loadComponent: () => import('@pages').then((m) => m.MainPage),
  },
  {
    title: 'Подробная информация',
    path: 'adverts',
    loadComponent: () => import('@pages').then((m) => m.AdvertsPage),
    data: { breadcrumb: 'Доска объявлений' },
  },
  {
    title: 'Подробная информация',
    path: 'adverts/:id',
    canActivate: [authGuard],
    loadComponent: () => import('@pages').then((m) => m.AdvertDetailPage),
    data: { breadcrumb: 'Подробная информация' },
  },
  {
    title: 'Новое объявление',
    path: 'new-advert',
    canActivate: [authGuard],
    loadComponent: () => import('@pages').then((m) => m.NewAdvertPage),
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
  {
    title: '',
    path: 'user-management',
    canActivate: [authGuard, AdminGuard],
    loadComponent: () => import('@pages').then((m) => m.UserManagementPage),
    data: { breadcrumb: 'Панель администратора' },
  },
];
