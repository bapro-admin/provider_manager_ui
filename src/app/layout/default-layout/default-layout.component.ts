import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultHeaderComponent } from './';
import { navItems } from './_nav';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet
  ]
})
export class DefaultLayoutComponent {
  public navItems = navItems;

  constructor(private sessionService : SessionStorageService, private router: Router){
    this.loadNavItems();
  }

  onScrollbarUpdate($event: any) {
  }

  loadNavItems() {
    const user = this.sessionService.getUser();

    // Filtra los elementos de navegación según el rol
    this.navItems = navItems.filter(item => {
      // Excluye el menú de 'Usuarios' si el rol no es ADMIN
      if (item.name === 'Usuarios' && user.role !== 'ADMIN') {
        return false;
      }
      return true;
    });
  }

  doLogout(){
    this.sessionService.signOut();
    this.router.navigate([''])
  }
}
