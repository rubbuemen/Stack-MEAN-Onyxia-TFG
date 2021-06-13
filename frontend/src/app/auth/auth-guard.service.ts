import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.estaAutentificado()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class VisitanteGuardService implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const rol = route.data.rol;
    const usuario = this.authService.getUsuarioLogeado();
    if (!this.authService.estaAutentificado() || usuario.rol !== rol) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
