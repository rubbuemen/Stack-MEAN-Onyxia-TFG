import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/services/private/actor.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from '../../../auth/auth.service';
import { BuzonService } from '../../../services/private/buzon.service';
import { NotificacionService } from '../../../services/private/notificacion.service';

@Component({
  selector: 'app-header-private',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderPrivateComponent implements OnInit {
  public actor: any;
  public hayNotificacionesNuevas = false;
  private imageDefault: any = 'assets/images/default-card.svg';

  constructor(
    private actorService: ActorService,
    private buzonService: BuzonService,
    private notificacionService: NotificacionService,
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
      this.buzonService.getBuzonEntrada().subscribe((buzon) => {
        this.notificacionService
          .getNotificacionesLeidasByBuzonId(buzon._id)
          .subscribe((notificaciones) => {
            if (notificaciones.length !== 0) {
              this.hayNotificacionesNuevas = true;
            }
          });
      });
      this.actor = actor;
    });
  }

  public logout() {
    this.authService.logout();
  }
}
