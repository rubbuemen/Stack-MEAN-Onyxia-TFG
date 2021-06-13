import { Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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
  private usuarioAutentificado: any = this.getUsuarioLogeado();

  constructor(
    private requestConstructorService: RequestsConstructorService,
    private router: Router,
    private location: Location,
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
          this.cambiarMenu('login');
          this.location.back();
          return res;
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('jwtToken');
    this.cambiarMenu('logout');
    this.router.navigate([this.router.url]);
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
    return this.usuarioAutentificado ? true : false;
  }

  public tieneRol(autoridad: string): boolean {
    return (
      this.estaAutentificado() &&
      this.usuarioAutentificado.autoridad === autoridad
    );
  }

  private cambiarMenu(opcion: string): void {
    const menu = this.menuService.generarMenu();
    if (opcion === 'logout') {
      const indexMenu: number = menu.findIndex((obj) => {
        return obj.titulo === 'Cerrar sesión';
      });
      menu.splice(indexMenu, 1);
      menu.push({
        titulo: 'Zona privada',
        url: '/privado',
        submenu: [
          { titulo: 'Registrarse', url: '/registro' },
          { titulo: 'Autentificarse', url: '/login' },
        ],
      });
    }
    if (opcion === 'login') {
      const indexMenu: number = menu.findIndex((obj) => {
        return obj.titulo === 'Zona privada';
      });
      menu.splice(indexMenu, 1);
      menu.push({
        titulo: 'Cerrar sesión',
        url: '/logout',
      });
    }
    this.menuEmit.emit(menu);
  }
}
