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
          { titulo: 'Bandeja de entrada', url: '/private/notificacion' },
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
    if (this.actor.cuentaUsuario.autoridad === 'PRESIDENTE') {
      this.menuLateral.push({
        titulo: 'Listado de usuarios',
        identificador: 'usuarios',
        claseIcono: 'mdi mdi-account-multiple',
        submenu: [
          {
            titulo: 'Listado de visitantes',
            url: '/private/actor/list/visitante',
          },
          {
            titulo: 'Listado de miembros',
            url: '/private/actor/list/miembro',
          },
        ],
      });
    }
  }

  public logout() {
    this.authService.logout();
  }
}
