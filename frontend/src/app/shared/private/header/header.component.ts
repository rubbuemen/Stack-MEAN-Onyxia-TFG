import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header-private',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderPrivateComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public logout() {
    this.authService.logout();
  }
}
