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
}
