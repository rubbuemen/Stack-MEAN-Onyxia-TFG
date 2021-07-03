import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { CanActivate, CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.estaAutentificado()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  private activarAutentificado(): boolean {
    if (!this.authService.estaAutentificado()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  canActivate(): boolean {
    return this.activarAutentificado();
  }

  canActivateChild(): boolean {
    return this.canActivate();
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
