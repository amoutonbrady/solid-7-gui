import { lazy } from 'solid-js';
import { Route } from './router';

export const routes: Route[] = [
  {
    name: 'Home',
    path: '/',
    component: lazy(() => import('./pages/index')),
  },
  {
    name: 'About',
    path: '/about',
    component: lazy(() => import('./pages/about')),
  },
];
