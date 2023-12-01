import { DemiToolbarConfig } from 'demiurge';
import { RoutePath } from '../interfaces/route.interface';

export const TOOLBAR_CONFIG: DemiToolbarConfig = {
  title: 'Blazebooks',
  toggleTitle: 'Blazebooks',
  items: [
    {
      label: 'login',
      url: RoutePath.Login,
      hidden: true,
    },
    {
      label: 'home',
      url: RoutePath.Home,
      icon: 'bi-house',
      toggleable: true,
      activeButtons: ['toggle', 'search'],
    },
    {
      label: 'search',
      url: RoutePath.Search,
      icon: 'bi-search',
      toggleable: true,
      activeButtons: ['back', 'search'],
    },
    {
      label: 'reader',
      url: RoutePath.Reader,
      activeButtons: ['back'],
      hidden: true,
    },
    {
      label: 'detail',
      url: RoutePath.Detail,
      activeButtons: ['back'],
      hidden: true,
    },
  ],
};
