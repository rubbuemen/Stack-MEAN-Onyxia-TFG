import { Component, EventEmitter, Output } from '@angular/core';
import { MenuService } from '../../../services/public/menu.service';

@Component({
  selector: 'app-menu-public',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuPublicComponent {
  menuItems: any[];

  constructor(private menuService: MenuService) {
    this.menuItems = this.menuService.menu;
  }
}
