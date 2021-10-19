import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';

import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Actividad } from '../../../../models/actividad.model';
import { ActividadService } from 'src/app/services/private/actividad.service';
import { Material } from '../../../../models/material.model';
import { MaterialService } from '../../../../services/private/material.service';

@Component({
  selector: 'app-actividad-display',
  templateUrl: './actividad-display.component.html',
  styles: [],
})
export class ActividadDisplayComponent implements OnDestroy, OnInit {
  public materiales: Material[];
  public actividad: Actividad;
  private idObjectActividad: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private materialService: MaterialService,
    private actividadService: ActividadService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.route.params.subscribe((params) => {
      this.getActividad(params['id']);
      this.getMaterialesActividad(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getActividad(actividadId: string): void {
    this.idObjectActividad = this.utils.convertirObjectId(actividadId);
    if (this.idObjectActividad !== undefined) {
      this.actividadService
        .getActividad(this.idObjectActividad)
        .subscribe((actividad) => {
          let imagen =
            'data:' +
            actividad.fotografia.mimetype +
            ';base64,' +
            actividad.fotografia.data;
          const imagenSRC = this.utils.usarImagenBase64(imagen);
          actividad.fotografia = imagenSRC;
          this.actividad = actividad;
        });
    }
  }

  private getMaterialesActividad(actividadId: string): void {
    this.idObjectActividad = this.utils.convertirObjectId(actividadId);
    if (this.idObjectActividad !== undefined) {
      this.materialService
        .getMaterialesByActividadId(this.idObjectActividad)
        .subscribe((materiales) => {
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
  }
}
