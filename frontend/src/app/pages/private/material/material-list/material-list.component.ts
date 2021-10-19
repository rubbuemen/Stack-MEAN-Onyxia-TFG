import { Component, OnDestroy, OnInit } from '@angular/core';
import { Material } from '../../../../models/material.model';
import { MaterialService } from '../../../../services/private/material.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styles: [],
})
export class MaterialListComponent implements OnDestroy, OnInit {
  public materiales: Material[];
  private idObject: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private materialService: MaterialService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.getMateriales();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getMateriales(): void {
    this.materialService.getMateriales().subscribe((materiales) => {
      materiales.forEach((material) => {
        let imagen =
          'data:' +
          material.fotografia.mimetype +
          ';base64,' +
          material.fotografia.data;
        const imagenSRC = this.utils.usarImagenBase64(imagen);
        material.fotografia = imagenSRC;
      });
      this.materiales = materiales;
      this.dtTrigger.next();
    });
  }

  public eliminarMaterial(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar el material?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.materialService.eliminarMaterial(this.idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Datos eliminados',
                    'Se ha eliminado el material correctamente',
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
