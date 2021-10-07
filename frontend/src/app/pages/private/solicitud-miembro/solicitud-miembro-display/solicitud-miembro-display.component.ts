import { Component, OnInit } from '@angular/core';

import { SolicitudMiembro } from '../../../../models/solicitud-miembro.model';

import { UtilsService } from '../../../../services/utils.service';
import { AuthService } from '../../../../auth/auth.service';
import { SolicitudMiembroService } from 'src/app/services/private/solicitud-miembro.service';

@Component({
  selector: 'app-solicitud-miembro-display',
  templateUrl: './solicitud-miembro-display.component.html',
  styles: [],
})
export class SolicitudMiembroDisplayComponent implements OnInit {
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
}
