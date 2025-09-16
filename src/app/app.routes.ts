import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    canActivate: [authGuard],
  },
  {
    path: 'brands',
    loadComponent: () => import('./features/brands/brands').then((m) => m.Brands),
    data: { title: 'Brands - E-commerce' },
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart').then((m) => m.Cart),
    data: { title: 'Cart - E-commerce' },
    canActivate: [authGuard],
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/categories').then((m) => m.Categories),
    data: { title: 'Categories - E-commerce' },
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
    data: { title: 'Login - E-commerce' },
  },
  {
    path: 'product',
    loadComponent: () => import('./features/products/products').then((m) => m.Products),
    data: { title: 'Products - E-commerce' },
    canActivate: [authGuard],
  },
  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./features/product-details/product-details').then((m) => m.ProductDetails),
    data: { title: 'Products details - E-commerce' },
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register').then((m) => m.Register),
    data: { title: 'Register - E-commerce' },
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./features/reset-password/reset-password').then((m) => m.ResetPassword),
    data: { title: 'Reset Password - E-commerce' },
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./features/wishlist/wishlist').then((m) => m.WishlistComponent),
    data: { title: 'Wishlist - E-commerce' },
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    loadComponent: () => import('./features/all-orders/all-orders').then((m) => m.AllOrders),
    data: { title: 'All orders - E-commerce' },
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./features/notfound/notfound').then((m) => m.Notfound),
    data: { title: 'Not found - E-commerce' },
  },
];
