import { Routes } from "@angular/router";
import { HomePage } from "@pages/home/home.page";
import { SearchPage } from "@pages/search/search.page";
import { ReaderPage } from "@pages/reader/reader.page";
import { RouteName } from "@enum/route.enum";

export const ROUTES: Routes = [
  { path: "", redirectTo: RouteName.Home, pathMatch: "full" },
  {
    path: RouteName.Home,
    component: HomePage,
    canActivate: [],
  },
  {
    path: RouteName.Search,
    component: SearchPage,
    canActivate: [],
  },
  {
    path: `${RouteName.Reader}/:id`,
    component: ReaderPage,
    canActivate: [],
  },
];
