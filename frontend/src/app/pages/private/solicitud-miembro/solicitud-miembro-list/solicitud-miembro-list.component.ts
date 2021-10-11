import { Component, OnDestroy, OnInit } from '@angular/core';
import { SolicitudMiembro } from '../../../../models/solicitud-miembro.model';
import { SolicitudMiembroService } from '../../../../services/private/solicitud-miembro.service';
import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-solicitud-miembro-list',
  templateUrl: './solicitud-miembro-list.component.html',
  styles: [],
})
export class SolicitudMiembroListComponent implements OnInit, OnDestroy {
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
    this.getSolicitudesPagadas();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getSolicitudesPagadas(): void {
    this.solicitudMiembroService
      .getSolicitudesPagadas()
      .subscribe((solicitudes) => {
        this.solicitudesMiembros = solicitudes;
        this.dtTrigger.next();
      });
  }
}
