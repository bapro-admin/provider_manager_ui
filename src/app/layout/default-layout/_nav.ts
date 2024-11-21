import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Usuarios',
    url: '/usuarios',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Proveedores',
    url: '/proveedores',
    iconComponent: { name: 'cil-address-book' }
  }
];
