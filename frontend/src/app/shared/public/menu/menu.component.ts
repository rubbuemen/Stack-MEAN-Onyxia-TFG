import { Component } from '@angular/core';

import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-menu-public',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuPublicComponent {
  public menuItems: any[];

  constructor(private authService: AuthService) {
    this.authService.menuEmit.subscribe(
      (menu) => (this.menuItems = menu.menuHeader)
    );
    this.authService.generarMenuSegunAuth(this.authService.estaAutentificado());
  }

  public logout() {
    this.authService.logout();
  }
}
