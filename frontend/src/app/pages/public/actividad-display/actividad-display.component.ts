import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Actividad } from '../../../models/actividad.model';

import { ActividadService } from '../../../services/public/actividad.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-actividad-display-public',
  templateUrl: './actividad-display.component.html',
})
export class ActividadPublicDisplayComponent implements OnInit {
  public actividad: Actividad;

  constructor(
    private actividadService: ActividadService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getActividad(params['id']);
    });
  }

  private getActividad(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      this.actividadService.getActividad(idObject).subscribe(
        (actividad) => {
          let imagen =
            'data:' +
            actividad.fotografia.mimetype +
            ';base64,' +
            actividad.fotografia.data;
          const imagenSRC = this.utils.usarImagenBase64(imagen);
          actividad.fotografia = imagenSRC;
          this.actividad = actividad;
        },
        (error) => {
          this.router.navigate(['/']);
        }
      );
    }
  }
}
