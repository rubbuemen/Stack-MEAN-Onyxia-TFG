import { Component, OnInit } from '@angular/core';

import { ActorService } from '../../../../services/private/actor.service';
import { UtilsService } from '../../../../services/utils.service';

import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-actor-self-display',
  templateUrl: './actor-self-display.component.html',
  styles: [],
})
export class ActorSelfDisplayComponent implements OnInit {
  public actorLogeado: any;
  public esVisitante: boolean = false;

  constructor(
    private actorService: ActorService,
    private utils: UtilsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.esVisitante = this.authService.tieneRol('VISITANTE');
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
      }
      if (!this.utils.existe(actor.alias)) actor.alias = '-';
      if (!this.utils.existe(actor.numeroTelefono)) actor.numeroTelefono = '-';
      if (this.esVisitante) {
        actor.rol = 'Visitante';
      } else {
        actor.rol = actor.rol.toLowerCase();
      }
      this.actorLogeado = actor;
    });
  }
}
