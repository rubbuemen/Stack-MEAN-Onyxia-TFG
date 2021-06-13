import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  public generarMenu(): any[] {
    const menu: any[] = [
      { titulo: 'Inicio', url: '/' },
      {
        titulo: 'Sobre nosotros',
        url: '/sobre-nosotros',
        submenu: [{ titulo: 'Colaboraciones', url: '/colaboraciones' }],
      },
      { titulo: '¿Quieres entrar en Onyxia?', url: '/quieres-entrar' },
      {
        titulo: 'Eventos',
        url: '/eventos',
        submenu: [
          {
            titulo: 'Bases de concurso de baile de K-Pop',
            url: '/bases-concurso',
          },
        ],
      },
      { titulo: 'Actividades', url: '/actividades' },
      { titulo: 'Fotografias', url: '/albumes-fotografias' },
      { titulo: 'Noticias', url: '/noticias' },
      {
        titulo: 'Zona privada',
        url: '/privado',
        submenu: [
          { titulo: 'Registrarse', url: '/registro' },
          { titulo: 'Autentificarse', url: '/login' },
        ],
      },
    ];
    return menu;
  }
}
