import { Component, OnDestroy, OnInit } from '@angular/core';
import { SolicitudMiembro } from '../../../../models/solicitud-miembro.model';
import { SolicitudMiembroService } from '../../../../services/private/solicitud-miembro.service';
import { UtilsService } from '../../../../services/utils.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-solicitud-miembro-rechazadas',
  templateUrl: './solicitud-miembro-rechazadas.component.html',
  styles: [],
})
export class SolicitudMiembroRechazadasComponent implements OnInit, OnDestroy {
  public solicitudesMiembros: SolicitudMiembro[];

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private solicitudMiembroService: SolicitudMiembroService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.getSolicitudesRechazadas();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getSolicitudesRechazadas(): void {
    this.solicitudMiembroService
      .getSolicitudesRechazadas()
      .subscribe((solicitudes) => {
        this.solicitudesMiembros = solicitudes;
        this.dtTrigger.next();
      });
  }
}
