import { Component, OnInit } from '@angular/core';

import { ActorService } from '../../../../services/private/actor.service';
import { UtilsService } from '../../../../services/utils.service';

import { AuthService } from '../../../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
})
export class ActorFormComponent implements OnInit {
  public actor: any;
  public esVisitante: boolean = false;

  constructor(
    private actorService: ActorService,
    private utils: UtilsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.esVisitante = this.authService.tieneRol('VISITANTE');
    this.route.params.subscribe((params) => {
      this.getDatos(params['id']);
    });
  }

  private getDatos(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      this.actorService.getDatos(idObject).subscribe((actor) => {
        if (this.utils.existe(actor.fotografia)) {
          let imagen =
            'data:' +
            actor.fotografia.mimetype +
            ';base64,' +
            actor.fotografia.data;

          const imagenSRC = this.utils.usarImagenBase64(imagen);
          actor.fotografia = imagenSRC;
        }
        if (!this.utils.existe(actor.alias)) actor.alias = '';
        if (!this.utils.existe(actor.telefono)) actor.telefono = '';

        this.actor = actor;
      });
    }
  }
}
