import { Component, OnInit } from '@angular/core';

import { ActorService } from 'src/app/services/private/actor.service';
import { UtilsService } from '../../../services/utils.service';
import { AuthService } from '../../../auth/auth.service';
import { CuentaUsuario } from '../../../models/cuenta-usuario.model';

@Component({
  selector: 'app-menu-private',
  templateUrl: './menu.component.html',
  styles: [],
})
export class MenuPrivateComponent implements OnInit {
  public actor: any;
  private imageDefault: any = 'assets/images/default-card.svg';
  public menuPerfil: any[];
  public menuLateral: any[];

  constructor(
    private actorService: ActorService,
    private utils: UtilsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getMisDatos();
  }

  private getMisDatos(): void {
    this.actorService.getMisDatos().subscribe((actor) => {
      if (this.utils.existe(actor.fotografia)) {
        let imagen =
          'data:' +
          actor.fotografia.mimetype +
          ';base64,' +
          actor.fotografia.data;
        const imagenSRC = this.utils.usarImagenBase64(imagen);
        actor.fotografia = imagenSRC;
      } else {
        actor.fotografia = this.imageDefault;
      }
      this.actor = actor;
      this.generarMenuPerfil();
      this.generarMenuLateral();
    });
  }

  private generarMenuPerfil(): void {
    this.menuPerfil = [
      { titulo: 'Mi perfil', url: '/private/actor' },
      {
        titulo: 'Mis redes sociales',
        url: '/private/red-social',
      },
      { titulo: 'Salir de la zona privada', url: '/' },
      { titulo: 'Desconectar', url: '/logout' },
    ];
  }

  private generarMenuLateral(): void {
    this.menuLateral = [
      {
        titulo: 'Notificaciones',
        identificador: 'notificaciones',
        claseIcono: 'mdi mdi-email',
        submenu: [
          {
            titulo: 'Bandeja de entrada',
            url: '/private/notificacion/bandeja',
          },
          { titulo: 'Nueva notificación', url: '/private/notificacion/form' },
        ],
      },
    ];
    // Según el rol logeado, variamos el menu:
    if (
      this.actor.cuentaUsuario.autoridad === 'VISITANTE' &&
      this.actor.solicitudMiembro
    ) {
      this.menuLateral.push({
        titulo: 'Solicitud para ser miembro',
        identificador: 'solicitud',
        claseIcono: 'mdi mdi-content-duplicate',
        submenu: [
          {
            titulo: 'Estado de solicitud',
            url: '/private/solicitud-miembro',
          },
        ],
      });
    }
    if (
      this.actor.cuentaUsuario.autoridad === 'PRESIDENTE' ||
      this.actor.cuentaUsuario.autoridad === 'VICEPRESIDENTE' ||
      this.actor.cuentaUsuario.autoridad === 'VOCAL' ||
      this.actor.cuentaUsuario.autoridad === 'SECRETARIO' ||
      this.actor.cuentaUsuario.autoridad === 'MIEMBRO'
    ) {
      this.menuLateral.push({
        titulo: 'Listado de usuarios',
        identificador: 'usuarios',
        claseIcono: 'mdi mdi-account-multiple',
        submenu: [
          {
            titulo: 'Listado de miembros',
            url: '/private/actor/list/miembro',
          },
        ],
      });
      if (
        this.actor.cuentaUsuario.autoridad === 'PRESIDENTE' ||
        this.actor.cuentaUsuario.autoridad === 'SECRETARIO'
      ) {
        let index = this.menuLateral.findIndex(
          (menu) => menu.identificador === 'usuarios'
        );
        this.menuLateral[index]['submenu'].splice(1, 0, {
          titulo: 'Listado de visitantes',
          url: '/private/actor/list/visitante',
        });
      }
    }
    if (this.actor.cuentaUsuario.autoridad === 'PRESIDENTE') {
      this.menuLateral.push({
        titulo: 'Solicitudes para ser miembro',
        identificador: 'solicitudes',
        claseIcono: 'mdi mdi-content-duplicate',
        submenu: [
          {
            titulo: 'Solicitudes pendientes',
            url: '/private/solicitud-miembro/pendientes',
          },
          {
            titulo: 'Solicitudes rechazadas',
            url: '/private/solicitud-miembro/rechazadas',
          },
          {
            titulo: 'Solicitudes aceptadas pendientes de pago',
            url: '/private/solicitud-miembro/aceptadas',
          },
          {
            titulo: 'Solicitudes aceptadas y pagadas',
            url: '/private/solicitud-miembro/list',
          },
        ],
      });
    }
    if (
      this.actor.cuentaUsuario.autoridad === 'PRESIDENTE' ||
      this.actor.cuentaUsuario.autoridad === 'VICEPRESIDENTE' ||
      this.actor.cuentaUsuario.autoridad === 'VOCAL' ||
      this.actor.cuentaUsuario.autoridad === 'SECRETARIO' ||
      this.actor.cuentaUsuario.autoridad === 'MIEMBRO'
    ) {
      this.menuLateral.push({
        titulo: 'Reuniones',
        identificador: 'reuniones',
        claseIcono: 'fa fa-group',
        submenu: [
          {
            titulo: 'Listado de reuniones pendientes',
            url: '/private/reunion/pendientes',
          },
          {
            titulo: 'Listado de reuniones realizadas',
            url: '/private/reunion/realizadas',
          },
        ],
      });
      this.menuLateral.push({
        titulo: 'Eventos',
        identificador: 'eventos',
        claseIcono: 'mdi mdi-domain',
        submenu: [
          {
            titulo: 'Listado de eventos públicos',
            url: '/private/evento/publicos',
          },
        ],
      });
    }
    if (
      this.actor.cuentaUsuario.autoridad === 'PRESIDENTE' ||
      this.actor.cuentaUsuario.autoridad === 'VICEPRESIDENTE' ||
      this.actor.cuentaUsuario.autoridad === 'VOCAL' ||
      this.actor.cuentaUsuario.autoridad === 'SECRETARIO'
    ) {
      let indexEventos = this.menuLateral.findIndex(
        (menu) => menu.identificador === 'eventos'
      );
      this.menuLateral[indexEventos]['submenu'].splice(1, 0, {
        titulo: 'Gestionar eventos',
        url: '/private/evento/gestion',
      });
      let indexReuniones = this.menuLateral.findIndex(
        (menu) => menu.identificador === 'reuniones'
      );
      this.menuLateral[indexReuniones]['submenu'].splice(2, 0, {
        titulo: 'Gestionar reuniones',
        url: '/private/reunion/gestion',
      });
      this.menuLateral.push({
        titulo: 'Actividades',
        identificador: 'actividades',
        claseIcono: 'fa fa-tasks',
        submenu: [
          {
            titulo: 'Gestionar actividades',
            url: '/private/actividad',
          },
        ],
      });
      this.menuLateral.push({
        titulo: 'Materiales',
        identificador: 'materiales',
        claseIcono: 'mdi mdi-archive',
        submenu: [
          {
            titulo: 'Gestionar materiales',
            url: '/private/material',
          },
        ],
      });
      this.menuLateral.push({
        titulo: 'Noticias',
        identificador: 'noticias',
        claseIcono: 'mdi mdi-newspaper',
        submenu: [
          {
            titulo: 'Gestionar noticias',
            url: '/private/noticia',
          },
        ],
      });
    }
  }

  public logout() {
    this.authService.logout();
  }
}
