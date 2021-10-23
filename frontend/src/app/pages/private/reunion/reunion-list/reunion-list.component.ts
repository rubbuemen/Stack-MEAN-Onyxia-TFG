import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reunion } from '../../../../models/reunion.model';
import { ReunionService } from '../../../../services/private/reunion.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-reunion-list',
  templateUrl: './reunion-list.component.html',
  styles: [],
})
export class ReunionListComponent implements OnDestroy, OnInit {
  public reuniones: Reunion[];
  private idObject: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private reunionService: ReunionService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.getReuniones();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getReuniones(): void {
    this.reunionService.getReuniones().subscribe((reuniones) => {
      reuniones.forEach((reunion) => {
        reunion.estadoReunion =
          reunion.estadoReunion[0].toUpperCase() +
          reunion.estadoReunion.substr(1).toLowerCase();
        reunion.tipoReunion =
          reunion.tipoReunion === 'ASOCIACION'
            ? 'Asociación'
            : 'Junta directiva';
      });
      this.reuniones = reuniones;
      this.dtTrigger.next();
    });
  }

  public cancelarReunion(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.reunionService.getReunion(this.idObject).subscribe((reunion) => {
        swal
          .fire({
            title: '¿Estás seguro de cancelar esta reunión?',
            text: 'Dicha reunión no podrá gestionarse más',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#06d79c',
            cancelButtonColor: '#2f3d4a',
            confirmButtonText: 'Sí, cancelar',
          })
          .then((res) => {
            if (res.isConfirmed) {
              this.reunionService.cancelarReunion(reunion._id).subscribe(
                () => {
                  swal
                    .fire(
                      'Reunión cancelado',
                      'Se ha cancelado el reunión correctamente',
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
      });
    }
  }

  public eliminarReunion(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar la reunión?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.reunionService.eliminarReunion(this.idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Datos eliminados',
                    'Se ha eliminado el reunión correctamente',
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
