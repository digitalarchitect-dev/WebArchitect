import { Routes } from '@angular/router';
import { AutohubShell } from './autohub-shell';

export const AUTOHUB_ROUTES: Routes = [
  {
    path: '',
    component: AutohubShell,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.AutohubHome),
      },
      {
        path: 'cars',
        loadComponent: () => import('./pages/catalog/catalog').then((m) => m.Catalog),
      },
      {
        path: 'cars/:id',
        loadComponent: () => import('./pages/car-detail/car-detail').then((m) => m.CarDetail),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites').then((m) => m.Favorites),
      },
      {
        path: '**',
        loadComponent: () => import('../../pages/not-found/not-found').then((m) => m.NotFound),
      },
    ],
  },
];
