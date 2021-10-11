import { Component, OnDestroy, OnInit } from '@angular/core';
import { SolicitudMiembro } from '../../../../models/solicitud-miembro.model';
import { SolicitudMiembroService } from '../../../../services/private/solicitud-miembro.service';
import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-solicitud-miembro-aceptadas',
  templateUrl: './solicitud-miembro-aceptadas.component.html',
  styles: [],
})
export class SolicitudMiembroAceptadasComponent implements OnInit, OnDestroy {
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
    this.getSolicitudesAceptadas();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getSolicitudesAceptadas(): void {
    this.solicitudMiembroService
      .getSolicitudesAceptadas()
      .subscribe((solicitudes) => {
        this.solicitudesMiembros = solicitudes;
        this.dtTrigger.next();
      });
  }

  public establecerPagado(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de establecer como pagado la solicitud?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, establecer',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.solicitudMiembroService.establecerPagado(idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Solicitud pagada',
                    'Se ha establecido como pagada la solicitud correctamente',
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
