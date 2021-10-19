import { Component, OnDestroy, OnInit } from '@angular/core';
import { Inventario } from '../../../../models/inventario.model';
import { InventarioService } from '../../../../services/private/inventario.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Material } from '../../../../models/material.model';
import { MaterialService } from 'src/app/services/private/material.service';

@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styles: [],
})
export class InventarioListComponent implements OnDestroy, OnInit {
  public material: Material;
  private idObjectMaterial: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private inventarioService: InventarioService,
    private materialService: MaterialService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.route.params.subscribe((params) => {
      this.getMaterial(params['materialId']);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getMaterial(materialId: string): void {
    this.idObjectMaterial = this.utils.convertirObjectId(materialId);
    if (this.idObjectMaterial !== undefined) {
      this.materialService
        .getMaterial(this.idObjectMaterial)
        .subscribe((material) => {
          let imagen =
            'data:' +
            material.fotografia.mimetype +
            ';base64,' +
            material.fotografia.data;
          const imagenSRC = this.utils.usarImagenBase64(imagen);
          material.fotografia = imagenSRC;
          material.inventarios.forEach((inventario) => {
            inventario.estadoMaterial =
              inventario.estadoMaterial[0].toUpperCase() +
              inventario.estadoMaterial.substr(1).toLowerCase();
          });
          this.material = material;
          this.dtTrigger.next();
        });
    }
  }

  public deteriorarArreglarInventario(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      this.inventarioService.getInventario(idObject).subscribe((inventario) => {
        const titleDeteriorar =
          inventario.estadoMaterial === 'OPERATIVO' ? 'deteriorar' : 'arreglar';
        const textoDeteriorar =
          inventario.estadoMaterial === 'OPERATIVO'
            ? 'deteriorada'
            : 'arreglada';
        swal
          .fire({
            title:
              '¿Estás seguro de ' +
              titleDeteriorar +
              ' esta unidad del inventario?',
            text: 'Dicha unidad del inventario será ' + textoDeteriorar,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#06d79c',
            cancelButtonColor: '#2f3d4a',
            confirmButtonText: 'Sí, confirmar',
          })
          .then((res) => {
            if (res.isConfirmed) {
              if (inventario.estadoMaterial === 'OPERATIVO') {
                this.inventarioService
                  .deteriorarInventario(inventario._id)
                  .subscribe(
                    () => {
                      swal
                        .fire(
                          'Unidad del inventario deteriorada',
                          'Se ha deteriorado la unidad del inventario correctamente',
                          'success'
                        )
                        .then(() => this.ngOnInit());
                    },
                    (error) => {
                      swal.fire('Error', error.error.error, 'error');
                    }
                  );
              } else {
                this.inventarioService
                  .arreglarInventario(inventario._id)
                  .subscribe(
                    () => {
                      swal
                        .fire(
                          'Unidad del inventario arreglada',
                          'Se ha arreglado la unidad del inventario correctamente',
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

  public descatalogarInventario(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de descatalogar esta unidad del inventario?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, descatalogar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.inventarioService.descatalogarInventario(idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Unidad descatalogada',
                    'Se ha descatalogado la unidad del inventario correctamente',
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
