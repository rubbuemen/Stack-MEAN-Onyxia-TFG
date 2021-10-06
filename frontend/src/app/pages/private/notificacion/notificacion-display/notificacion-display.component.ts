import { Component, OnInit } from '@angular/core';

import { Notificacion } from '../../../../models/notificacion.model';

import { NotificacionService } from '../../../../services/private/notificacion.service';
import { ActorService } from '../../../../services/private/actor.service';
import { UtilsService } from '../../../../services/utils.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Miembro } from '../../../../models/miembro.model';
import { Visitante } from '../../../../models/visitante.model';

@Component({
  selector: 'app-notificacion-display',
  templateUrl: './notificacion-display.component.html',
})
export class NotificacionDisplayComponent implements OnInit {
  public notificacion: Notificacion;
  public actorEmisor: any;
  private imageDefault: any = 'assets/images/default-card.svg';

  constructor(
    private notificacionService: NotificacionService,
    private actorService: ActorService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getNotificacion(params['id']);
    });
  }

  private getNotificacion(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      this.notificacionService.getNotificacion(idObject).subscribe(
        (notificacion) => {
          const idActorEmisor =
            notificacion.emisorMiembro || notificacion.emisorVisitante;
          const idObject = this.utils.convertirObjectId(
            idActorEmisor.toString()
          );
          this.actorService.getDatos(idObject).subscribe((actor) => {
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
            this.actorEmisor = actor;
          });
          this.notificacion = notificacion;
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }
}
