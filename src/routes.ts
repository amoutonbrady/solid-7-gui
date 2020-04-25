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
  {
    name: 'Counter',
    path: '/counter',
    component: lazy(() => import('./pages/counter')),
  },
  {
    name: 'Temperature',
    path: '/temperature',
    component: lazy(() => import('./pages/temperature')),
  },
  {
    name: 'Flight',
    path: '/flight',
    component: lazy(() => import('./pages/flight')),
  },
  {
    name: 'Timer',
    path: '/timer',
    component: lazy(() => import('./pages/timer')),
  },
];
