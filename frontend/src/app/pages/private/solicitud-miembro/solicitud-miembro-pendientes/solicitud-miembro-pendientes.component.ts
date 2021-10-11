import { Component, OnDestroy, OnInit } from '@angular/core';
import { SolicitudMiembro } from '../../../../models/solicitud-miembro.model';
import { SolicitudMiembroService } from '../../../../services/private/solicitud-miembro.service';
import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-solicitud-miembro-pendientes',
  templateUrl: './solicitud-miembro-pendientes.component.html',
  styles: [],
})
export class SolicitudMiembroPendientesComponent implements OnInit, OnDestroy {
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
    this.getSolicitudesPendientes();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getSolicitudesPendientes(): void {
    this.solicitudMiembroService
      .getSolicitudesPendientes()
      .subscribe((solicitudes) => {
        this.solicitudesMiembros = solicitudes;
        this.dtTrigger.next();
      });
  }

  public aceptarSolicitud(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de aceptar la solicitud?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, aceptar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.solicitudMiembroService.aceptarSolicitud(idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Solicitud aceptada',
                    'Se ha aceptado la solicitud correctamente',
                    'success'
                  )
                  .then(() => this.ngOnInit());
              },
              (error) => {
                swal.fire('Error', error.error.error, 'error');
              }
            );
          }
        });
    }
  }

  public rechazarSolicitud(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de rechazar la solicitud?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, rechazar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.solicitudMiembroService.rechazarSolicitud(idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Solicitud rechazada',
                    'Se ha rechazado la solicitud correctamente',
                    'success'
                  )
                  .then(() => this.ngOnInit());
              },
              (error) => {
                swal.fire('Error', error.error.error, 'error');
              }
            );
          }
        });
    }
  }
}
