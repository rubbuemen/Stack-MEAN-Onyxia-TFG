import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actividad } from '../../../../models/actividad.model';
import { ActividadService } from '../../../../services/private/actividad.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-actividad-list',
  templateUrl: './actividad-list.component.html',
  styles: [],
})
export class ActividadListComponent implements OnDestroy, OnInit {
  public actividades: Actividad[];
  private idObject: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private actividadService: ActividadService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.getActividades();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getActividades(): void {
    this.actividadService.getActividades().subscribe((actividades) => {
      actividades.forEach((actividad) => {
        let imagen =
          'data:' +
          actividad.fotografia.mimetype +
          ';base64,' +
          actividad.fotografia.data;
        const imagenSRC = this.utils.usarImagenBase64(imagen);
        actividad.fotografia = imagenSRC;
      });
      this.actividades = actividades;
      this.dtTrigger.next();
    });
  }

  public catalogarDescatalogarActividad(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.actividadService
        .getActividad(this.idObject)
        .subscribe((actividad) => {
          const titleVigor = actividad.enVigor
            ? 'descatalogar'
            : 'catalogar de nuevo';
          const textoNoVigor = actividad.enVigor ? 'no podrá' : 'podrá';
          swal
            .fire({
              title: '¿Estás seguro de ' + titleVigor + ' esta actividad?',
              text: 'Dicha actividad ' + textoNoVigor + ' asignarse a eventos',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#06d79c',
              cancelButtonColor: '#2f3d4a',
              confirmButtonText: 'Sí, confirmar',
            })
            .then((res) => {
              if (res.isConfirmed) {
                if (actividad.enVigor) {
                  this.actividadService
                    .descatalogarActividad(actividad._id)
                    .subscribe(
                      () => {
                        swal
                          .fire(
                            'Actividad descatalogada',
                            'Se ha descatalogado la actividad correctamente',
                            'success'
                          )
                          .then(() => this.ngOnInit());
                      },
                      (error) => {
                        swal.fire('Error', error.error.error, 'error');
                      }
                    );
                } else {
                  this.actividadService
                    .catalogarActividad(actividad._id)
                    .subscribe(
                      () => {
                        swal
                          .fire(
                            'Actividad catalogada de nuevo',
                            'Se ha dado de alta la actividad correctamente',
                            'success'
                          )
                          .then(() => this.ngOnInit());
                      },
                      (error) => {
                        swal.fire('Error', error.error.error, 'error');
                      }
                    );
                }
              }
            });
        });
    }
  }

  public publicarOcultarActividad(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.actividadService
        .getActividad(this.idObject)
        .subscribe((actividad) => {
          const titlePublicada = actividad.estaPublicado
            ? 'pasar a borrador'
            : 'publicar';
          const textoNoPublicada = actividad.estaPublicado
            ? 'dejará de ser visible'
            : 'pasará a ser visible';
          swal
            .fire({
              title: '¿Estás seguro de ' + titlePublicada + ' esta actividad?',
              text:
                'Dicha actividad ' + textoNoPublicada + ' en la parte pública',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#06d79c',
              cancelButtonColor: '#2f3d4a',
              confirmButtonText: 'Sí, confirmar',
            })
            .then((res) => {
              if (res.isConfirmed) {
                if (actividad.estaPublicado) {
                  this.actividadService
                    .ocultarActividad(actividad._id)
                    .subscribe(
                      () => {
                        swal
                          .fire(
                            'Actividad pasada a borrador',
                            'Se ha pasado a borrador la actividad correctamente',
                            'success'
                          )
                          .then(() => this.ngOnInit());
                      },
                      (error) => {
                        swal.fire('Error', error.error.error, 'error');
                      }
                    );
                } else {
                  this.actividadService
                    .publicarActividad(actividad._id)
                    .subscribe(
                      () => {
                        swal
                          .fire(
                            'Actividad publicada',
                            'Se ha publicado la actividad correctamente',
                            'success'
                          )
                          .then(() => this.ngOnInit());
                      },
                      (error) => {
                        swal.fire('Error', error.error.error, 'error');
                      }
                    );
                }
              }
            });
        });
    }
  }

  public eliminarActividad(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar la actividad?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.actividadService.eliminarActividad(this.idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Datos eliminados',
                    'Se ha eliminado la actividad correctamente',
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
