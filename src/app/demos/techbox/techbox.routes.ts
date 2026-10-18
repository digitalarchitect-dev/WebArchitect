import { Routes } from '@angular/router';
import { TechboxShell } from './techbox-shell';

export const TECHBOX_ROUTES: Routes = [
  {
    path: '',
    component: TechboxShell,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/catalog/catalog').then((m) => m.Catalog),
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then((m) => m.CartPage),
      },
      {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout').then((m) => m.CheckoutPage),
      },
      {
        path: 'order/:id',
        loadComponent: () => import('./pages/order-confirmation/order-confirmation').then((m) => m.OrderConfirmationPage),
      },
      {
        path: 'compare',
        loadComponent: () => import('./pages/compare/compare').then((m) => m.ComparePage),
      },
      {
        path: '**',
        loadComponent: () => import('../../pages/not-found/not-found').then((m) => m.NotFound),
      },
    ],
  },
];
