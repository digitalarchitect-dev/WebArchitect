import { Routes } from '@angular/router';
import { SiteLayout } from './layouts/site-layout/site-layout';

export const routes: Routes = [
  {
    path: 'projects/autohub',
    loadChildren: () => import('./demos/autohub/autohub.routes').then((m) => m.AUTOHUB_ROUTES),
  },
  {
    path: 'projects/techbox',
    loadChildren: () => import('./demos/techbox/techbox.routes').then((m) => m.TECHBOX_ROUTES),
  },
  {
    path: 'projects/skillio',
    loadChildren: () => import('./demos/skillio/skillio.routes').then((m) => m.SKILLIO_ROUTES),
  },
  {
    path: '',
    component: SiteLayout,
    children: [
      { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
      { path: 'projects', loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects) },
      { path: 'about', loadComponent: () => import('./pages/about/about').then((m) => m.About) },
      { path: 'contact', loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact) },
      { path: '**', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
    ],
  },
];
