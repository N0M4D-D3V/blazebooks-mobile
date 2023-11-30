import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { SearchPage } from './pages/search/search.page';
import { ReaderPage } from './pages/reader/reader.page';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'search',
    component: SearchPage,
  },
  {
    path: 'detail',
    component: SearchPage,
  },
  {
    path: 'reader',
    component: ReaderPage,
  },
];
