import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { RoleGuard } from './core/guards/role.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'usuarios',
        canActivate: [RoleGuard],
        loadComponent: () => import('./features/users/user-management/user-management.component').then(m => m.UserManagementComponent),
      },
      {
        path: 'proveedores',
        loadComponent: () => import('./features/providers/provider-management/provider-management.component').then(m => m.ProviderManagementComponent),
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  { path: '**', redirectTo: 'login' }
];
