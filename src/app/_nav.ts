import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Menu'
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'icon-briefcase'
  },
  {
    name: 'Posts',
    url: '/posts',
    icon: 'icon-basket-loaded'
  },
  {
    name: 'Comment',
    url: '/comments',
    icon: 'icon-basket-loaded'
  }
];
