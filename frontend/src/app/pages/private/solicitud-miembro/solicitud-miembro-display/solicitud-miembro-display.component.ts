import { Component, OnInit } from '@angular/core';

import { SolicitudMiembro } from '../../../../models/solicitud-miembro.model';

import { UtilsService } from '../../../../services/utils.service';
import { SolicitudMiembroService } from 'src/app/services/private/solicitud-miembro.service';
import { ObjectId } from 'mongoose';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solicitud-miembro-display',
  templateUrl: './solicitud-miembro-display.component.html',
  styles: [],
})
export class SolicitudMiembroDisplayComponent implements OnInit {
  public solicitudMiembro: SolicitudMiembro;
  private idObject: ObjectId;

  constructor(
    private solicitudMiembroService: SolicitudMiembroService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getSolicitudMiembro(params['id']);
    });
  }

  private getSolicitudMiembro(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.solicitudMiembroService
        .getSolicitudMiembro(this.idObject)
        .subscribe((solicitud) => {
          solicitud.intereses = this.convertirIntereses(solicitud.intereses);
          this.solicitudMiembro = solicitud;
        });
    }
  }

  public getColorSegunEstado(): string {
    switch (this.solicitudMiembro.estadoSolicitud) {
      case 'PENDIENTE':
        return 'alert-info';
      case 'ACEPTADO':
        return 'alert-success';
      case 'RECHAZADO':
        return 'alert-danger';
    }
  }

  private convertirIntereses(intereses: string[]) {
    if (intereses) {
      let interesesConvertidos = [];
      intereses.forEach((interes) => {
        switch (interes) {
          case 'BAILE':
            interesesConvertidos.push('Baile / K-Pop');
            break;
          case 'DIBUJO':
            interesesConvertidos.push('Dibujo');
            break;
          case 'SOFTCOMBAT':
            interesesConvertidos.push('Softcombat');
            break;
          case 'TALLERESMANUALIDADES':
            interesesConvertidos.push('Talleres y manualidades');
            break;
          case 'VIDEOJUEGOS':
            interesesConvertidos.push('Videojuegos');
            break;
          case 'COSPLAY':
            interesesConvertidos.push('Cosplay');
            break;
        }
      });
      return interesesConvertidos;
    }
    return [];
  }
}
