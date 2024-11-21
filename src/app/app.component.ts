import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { SessionStorageService } from './core/services/session-storage.service';
import { User } from './core/models/user.model';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'Gestion de Proveedores';
  isLoggedIn = false;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);

  readonly #colorModeService = inject(ColorModeService);
  readonly #iconSetService = inject(IconSetService);

  constructor(private tokenStorageService: SessionStorageService,
    private router: Router,
    private sessionService : SessionStorageService) {
    this.#titleService.setTitle(this.title);
    // iconSet singleton
    this.#iconSetService.icons = { ...iconSubset };
    this.#colorModeService.localStorageItemName.set('coreui-free-angular-admin-template-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {
    const token = this.tokenStorageService.getToken();
    this.isLoggedIn = !!token;
    
    this.#router.events.pipe(
        takeUntilDestroyed(this.#destroyRef)
      ).subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    // Validar si el token está expirado
    if (this.isLoggedIn && token && this.isTokenExpired(token)) {
      this.doLogout(); // Si está expirado, cerramos sesión
      return;
    }

    //if user is logged in we route to dashboard
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser() as User; 
      if(user.role === 'ADMIN'){
        this.router.navigate(['/usuarios'])
      }else {
        this.router.navigate(['/proveedores'])
      }
      
    }else{
      this.router.navigate([''])
    }

  }

   // Método para verificar si el token está expirado
   private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return true; // Si no se puede decodificar, asumimos que está expirado
    }
  }

  doLogout(){
    this.sessionService.signOut();
    this.router.navigate([''])
  }
}
