import { Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

import { environment } from '../../environments/environment.prod';

import { RequestsConstructorService } from '../services/requests-constructor.service';

import { CuentaUsuario } from '../models/cuenta-usuario.model';
import { LoginForm } from '../interfaces/login-form.interface';
import { MenuService } from '../services/public/menu.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() public menuEmit: EventEmitter<any> = new EventEmitter();
  @Output() public autentificado: EventEmitter<Boolean> = new EventEmitter();
  @Output() public esVisitante: EventEmitter<Boolean> = new EventEmitter();

  private usuarioAutentificado: any = this.getUsuarioLogeado();

  constructor(
    private requestConstructorService: RequestsConstructorService,
    private router: Router,
    private menuService: MenuService
  ) {}

  public login(loginForm: LoginForm): Observable<any> {
    const { usuario, contraseña } = loginForm;
    return this.requestConstructorService
      .request(
        'POST',
        `${base_url}/login`,
        { usuario, contraseña },
        {},
        false,
        [CuentaUsuario]
      )
      .pipe(
        map((res: { jwtToken: string }) => {
          localStorage.setItem('jwtToken', res.jwtToken);
          this.getUsuarioLogeado();
          this.generarMenuSegunAuth(true);
          this.router.navigate(['/']);
          return res;
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('jwtToken');
    this.usuarioAutentificado = undefined;
    this.generarMenuSegunAuth(false);
    this.autentificado.emit(false);
    this.esVisitante.emit(false);
    this.router.navigate(['/']);
  }

  public getUsuarioLogeado(): any {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const { _id, usuario, autoridad } = JSON.parse(atob(token.split('.')[1]));
      this.usuarioAutentificado = { _id, usuario, autoridad };
      return this.usuarioAutentificado;
    } else {
      return undefined;
    }
  }

  public estaAutentificado(): boolean {
    const autentificado: boolean = this.usuarioAutentificado ? true : false;
    this.autentificado.emit(autentificado);
    return autentificado;
  }

  public tieneRol(autoridad: string): boolean {
    const tieneRolAutoridad =
      this.estaAutentificado() &&
      this.usuarioAutentificado.autoridad === autoridad;
    if (autoridad === 'VISITANTE' && tieneRolAutoridad)
      this.esVisitante.emit(true);
    return tieneRolAutoridad;
  }

  public generarMenuSegunAuth(autentificado: boolean): void {
    const menuHeader = this.menuService.generarMenu(); // Reset del menú
    const menuFooter = this.menuService.generarMenuFooter();
    if (!autentificado) {
      menuHeader.push({
        titulo: 'Zona privada',
        url: '/login',
        submenu: [
          { titulo: 'Registrarse', url: '/registro' },
          { titulo: 'Autentificarse', url: '/login' },
        ],
      });
      menuFooter.push(
        {
          titulo: 'Registrarse',
          url: '/registro',
        },
        {
          titulo: 'Autentificarse',
          url: '/login',
        }
      );
    } else {
      menuHeader.push(
        {
          titulo: 'Zona privada',
          url: '/private',
        },
        {
          titulo: 'Cerrar sesión',
          url: '/logout',
        }
      );
      menuFooter.push(
        {
          titulo: 'Zona privada',
          url: '/private',
        },
        {
          titulo: 'Cerrar sesión',
          url: '/logout',
        }
      );
    }
    if (!autentificado || this.tieneRol('VISITANTE')) {
      menuHeader.splice(2, 0, {
        titulo: '¿Quieres entrar en Onyxia?',
        url: '/quieres-entrar',
      });
      menuFooter.splice(2, 0, {
        titulo: '¿Quieres entrar en Onyxia?',
        url: '/quieres-entrar',
      });
    }
    this.menuEmit.emit({ menuHeader, menuFooter });
  }
}
