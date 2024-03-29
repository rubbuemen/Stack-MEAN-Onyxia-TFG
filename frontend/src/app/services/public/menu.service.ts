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
    ];

    return menu;
  }

  public generarMenuFooter(): any[] {
    const menu: any[] = [
      { titulo: 'Inicio', url: '/' },
      {
        titulo: 'Sobre nosotros',
        url: '/sobre-nosotros',
      },
      {
        titulo: 'Eventos',
        url: '/eventos',
      },
      { titulo: 'Actividades', url: '/actividades' },
      { titulo: 'Fotografias de eventos', url: '/albumes-fotografias' },
      { titulo: 'Noticias', url: '/noticias' },
    ];

    return menu;
  }
}
