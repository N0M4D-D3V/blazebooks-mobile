import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { SearchPage } from './pages/search/search.page';
import { ReaderPage } from './pages/reader/reader.page';
import { DetailPage } from './pages/detail/detail.page';

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
    component: DetailPage,
  },
  {
    path: 'reader',
    component: ReaderPage,
  },
];
