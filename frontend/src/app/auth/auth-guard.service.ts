import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  canActivate(): boolean {
    const tieneRol = this.authService.tieneRol('VISITANTE');
    if (!this.authService.estaAutentificado() || !tieneRol) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PresidenteGuardService implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}
  canActivate(): boolean {
    const tieneRol = this.authService.tieneRol('PRESIDENTE');
    if (!this.authService.estaAutentificado() || !tieneRol) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class MiembroGuardService implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}
  canActivate(): boolean {
    const tieneRol =
      this.authService.tieneRol('MIEMBRO') ||
      this.authService.tieneRol('SECRETARIO') ||
      this.authService.tieneRol('VICEPRESIDENTE') ||
      this.authService.tieneRol('PRESIDENTE') ||
      this.authService.tieneRol('VOCAL');
    if (this.authService.estaAutentificado() && !tieneRol) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PresidenteSecretarioGuardService implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}
  canActivate(): boolean {
    const tieneRol =
      this.authService.tieneRol('PRESIDENTE') ||
      this.authService.tieneRol('SECRETARIO');
    if (!this.authService.estaAutentificado() || !tieneRol) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class NoAuthOVisitanteGuardService implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}
  canActivate(): boolean {
    const tieneRol = this.authService.tieneRol('VISITANTE');
    if (this.authService.estaAutentificado() && !tieneRol) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
