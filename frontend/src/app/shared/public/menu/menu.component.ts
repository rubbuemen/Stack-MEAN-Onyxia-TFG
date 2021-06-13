import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { MenuService } from '../../../services/public/menu.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-menu-public',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuPublicComponent {
  public menuItems: any[] = this.menuService.generarMenu();

  constructor(
    private menuService: MenuService,
    private authService: AuthService
  ) {
    this.authService.menuEmit.subscribe((menu) => (this.menuItems = menu));
  }

  public logout() {
    this.authService.logout();
  }
}
