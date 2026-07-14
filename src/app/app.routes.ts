import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.route').then(m => m.authRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes')
  }
];
