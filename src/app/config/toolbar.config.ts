import { DemiToolbarConfig } from 'demiurge';
import { RouteName, RoutePath } from '@enum/route.enum';
import packageJson from '../../../package.json';
import { Assets } from '@enum/assets.enum';

export const TOOLBAR_CONFIG: DemiToolbarConfig = {
  title: packageJson.name,
  toggleTitle: packageJson.name,
  defaultProfileImgPath: Assets.DefaultProfileImgPath,
  defaultTitle: 'Anónimo',
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
  ],
};
