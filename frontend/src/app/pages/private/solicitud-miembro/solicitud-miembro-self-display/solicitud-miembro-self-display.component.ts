import { Component, OnInit } from '@angular/core';

import { SolicitudMiembro } from '../../../../models/solicitud-miembro.model';

import { UtilsService } from '../../../../services/utils.service';
import { AuthService } from '../../../../auth/auth.service';
import { SolicitudMiembroService } from 'src/app/services/private/solicitud-miembro.service';

@Component({
  selector: 'app-solicitud-miembro-self-display',
  templateUrl: './solicitud-miembro-self-display.component.html',
  styles: [],
})
export class SolicitudMiembroSelfDisplayComponent implements OnInit {
  public solicitudMiembro: SolicitudMiembro;

  constructor(
    private solicitudMiembroService: SolicitudMiembroService,
    private utils: UtilsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getMiSolicitud();
  }

  private getMiSolicitud(): void {
    this.solicitudMiembroService.getMiSolicitud().subscribe((solicitud) => {
      solicitud.intereses = this.convertirIntereses(solicitud.intereses);
      this.solicitudMiembro = solicitud;
    });
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
