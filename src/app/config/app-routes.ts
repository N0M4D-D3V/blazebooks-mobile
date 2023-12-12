import { Routes } from '@angular/router';
import { LoginPage } from '@pages/login/login.page';
import { HomePage } from '@pages/home/home.page';
import { SearchPage } from '@pages/search/search.page';
import { ReaderPage } from '@pages/reader/reader.page';
import { DetailPage } from '@pages/detail/detail.page';
import { RouteName } from '@interfaces/route.interface';
import { AuthGuard } from '../guards/auth.guard';

export const ROUTES: Routes = [
  { path: '', redirectTo: RouteName.Login, pathMatch: 'full' },
  {
    path: RouteName.Login,
    component: LoginPage,
  },
  {
    path: RouteName.Home,
    component: HomePage,
    canActivate: [AuthGuard],
  },
  {
    path: RouteName.Search,
    component: SearchPage,
  },
  {
    path: RouteName.Detail,
    component: DetailPage,
  },
  {
    path: RouteName.Reader,
    component: ReaderPage,
  },
];
