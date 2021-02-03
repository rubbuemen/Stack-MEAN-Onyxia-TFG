import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookies-alert',
  templateUrl: './cookies-alert.component.html',
  styleUrls: ['./cookies-alert.component.css'],
})
export class CookiesAlertComponent {
  existe: boolean = this.cookieService.check('Cookie');

  constructor(private cookieService: CookieService) {}

  public acceptGRDP(): void {
    this.existe = !this.existe;
    this.cookieService.set('Cookie', 'GDPR');
  }
}
