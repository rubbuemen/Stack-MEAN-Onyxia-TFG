import { Component, OnInit } from '@angular/core';

import { ActividadService } from '../../../services/public/actividad.service';
import { UtilsService } from '../../../services/utils.service';

import { Actividad } from '../../../models/actividad.model';

@Component({
  selector: 'app-actividades-public',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
})
export class ActividadesPublicComponent implements OnInit {
  public actividadesPublicas: Actividad[] = [];

  constructor(
    private actividadService: ActividadService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.getActividadesPublicas();
  }

  private getActividadesPublicas(): void {
    this.actividadService.getActividadesPublicas().subscribe((actividades) => {
      actividades.forEach((actividad) => {
        let imagen =
          'data:' +
          actividad.fotografia.mimetype +
          ';base64,' +
          actividad.fotografia.data;
        const imagenSRC = this.utils.usarImagenBase64(imagen);
        actividad.fotografia = imagenSRC;
      });
      this.actividadesPublicas = actividades;
    });
  }
}
