import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service'; // Ajusta el path según sea necesario

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private sessionService: SessionStorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.sessionService.getUser();

    // Verifica si el usuario no es ADMIN y está intentando acceder a '/usuarios'
    if (route.routeConfig?.path === 'usuarios' && user.role !== 'ADMIN') {
      this.router.navigate(['/proveedores']);
      return false; // Previene el acceso a la ruta
    }

    return true; // Permite el acceso si es ADMIN o no es la ruta restringida
  }
}
