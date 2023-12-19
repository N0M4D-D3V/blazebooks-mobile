import { DemiToolbarConfig } from 'demiurge';
import { RouteName, RoutePath } from '@interfaces/route.interface';
import packageJson from '../../../package.json';

export const TOOLBAR_CONFIG: DemiToolbarConfig = {
  title: packageJson.name,
  toggleTitle: packageJson.name,
  items: [
    {
      label: RouteName.Login,
      url: RoutePath.Login,
      hidden: true,
    },
    {
      label: RouteName.Home,
      url: RoutePath.Home,
      icon: 'bi-house',
      toggleable: true,
      activeButtons: ['toggle', 'search'],
    },
    {
      label: RouteName.Search,
      url: RoutePath.Search,
      icon: 'bi-search',
      toggleable: true,
      activeButtons: ['back', 'search'],
    },
    {
      label: RouteName.Reader,
      url: RoutePath.Reader,
      activeButtons: ['back'],
      hidden: true,
    },
    {
      label: RouteName.Detail,
      url: RoutePath.Detail,
      activeButtons: ['back'],
      hidden: true,
    },
  ],
};
