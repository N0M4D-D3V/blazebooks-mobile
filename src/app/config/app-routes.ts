import { Routes } from "@angular/router";
import { HomePage } from "@pages/home/home.page";
import { SearchPage } from "@pages/search/search.page";
import { ReaderPage } from "@pages/reader/reader.page";
import { RouteName } from "@enum/route.enum";
import { ConfigPage } from "@pages/config/config.page";
import { CommunityPage } from "@pages/community/community.page";

export const ROUTES: Routes = [
  { path: "", redirectTo: RouteName.Home, pathMatch: "full" },
  {
    path: RouteName.Home,
    component: HomePage,
  },
  {
    path: RouteName.Search,
    component: SearchPage,
  },
  {
    path: RouteName.Config,
    component: ConfigPage,
  },
  {
    path: `${RouteName.Reader}/:id`,
    component: ReaderPage,
  },
  {
    path: RouteName.Community,
    component: CommunityPage,
  },
];
