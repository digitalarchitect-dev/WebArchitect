import { Routes } from '@angular/router';
import { SkillioShell } from './skillio-shell';

export const SKILLIO_ROUTES: Routes = [{
  path: '', component: SkillioShell, children: [
    { path: '', loadComponent: () => import('./pages/catalog/catalog').then((m) => m.SkillioCatalog) },
    { path: 'favorites', loadComponent: () => import('./pages/favorites/favorites').then((m) => m.SkillioFavorites) },
    { path: 'expert/:id', loadComponent: () => import('./pages/expert-detail/expert-detail').then((m) => m.SkillioExpertDetail) },
    { path: '**', loadComponent: () => import('../../pages/not-found/not-found').then((m) => m.NotFound) },
  ],
}];
