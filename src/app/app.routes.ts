import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'shape/:id',
    loadComponent: () => import('@pages/shape.component'),
  },
];
