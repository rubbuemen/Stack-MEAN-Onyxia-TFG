import { Component, OnInit } from '@angular/core';

import { ActorService } from '../../../../services/private/actor.service';
import { UtilsService } from '../../../../services/utils.service';

import { AuthService } from '../../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongoose';
import { Miembro } from 'src/app/models/miembro.model';

@Component({
  selector: 'app-actor-display',
  templateUrl: './actor-display.component.html',
  styles: [],
})
export class ActorDisplayComponent implements OnInit {
  public actor: any;
  public rolMiembro: string;
  public esVisitante: boolean = false;
  private idObject: ObjectId;

  constructor(
    private actorService: ActorService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMisDatos();
    this.route.params.subscribe((params) => {
      this.getDatos(params['id']);
    });
  }

  private getMisDatos(): void {
    this.actorService.getMisDatos().subscribe((actor) => {
      this.rolMiembro = actor.cuentaUsuario.autoridad;
    });
  }

  private getDatos(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.actorService.getDatos(this.idObject).subscribe((actor) => {
        this.esVisitante = actor.cuentaUsuario.autoridad === 'VISITANTE';
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
        if (!this.utils.existe(actor.numeroTelefono))
          actor.numeroTelefono = '-';
        if (this.esVisitante) {
          actor.rol = 'Visitante';
        } else {
          actor.rol =
            actor.rol[0].toUpperCase() + actor.rol.substr(1).toLowerCase();
          if (actor.rol === 'Estandar') {
            actor.rol = 'Miembro estandar';
          }
        }
        this.actor = actor;
      });
    }
  }
}
