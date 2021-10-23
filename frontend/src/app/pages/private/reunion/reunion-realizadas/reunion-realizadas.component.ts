import { Component, OnDestroy, OnInit } from '@angular/core';
import { Reunion } from '../../../../models/reunion.model';
import { ReunionService } from '../../../../services/private/reunion.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { AuthService } from '../../../../auth/auth.service';
import { AsistenciaMiembroReunionService } from '../../../../services/private/asistencia-miembro-reunion.service';

@Component({
  selector: 'app-reunion-realizadas',
  templateUrl: './reunion-realizadas.component.html',
  styles: [],
})
export class ReunionRealizadasComponent implements OnDestroy, OnInit {
  public reuniones: Reunion[];
  private idObject: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private reunionService: ReunionService,
    private authService: AuthService,
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
    this.reunionService.getReunionesRealizadas().subscribe((reuniones) => {
      let reunionesQuitar = [];
      if (this.authService.tieneRol('MIEMBRO')) {
        reuniones.forEach((reunion) => {
          if (reunion.tipoReunion === 'JUNTADIRECTIVA') {
            reunionesQuitar.push(reunion);
          }
        });
      }
      reuniones = reuniones.filter(
        (reunion) => !reunionesQuitar.includes(reunion)
      );
      this.reuniones = reuniones;
      this.dtTrigger.next();
    });
  }
}
