import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';

import { ActivatedRoute } from '@angular/router';
import { Reunion } from '../../../../models/reunion.model';
import { ReunionService } from 'src/app/services/private/reunion.service';
import { AsistenciaMiembroReunion } from '../../../../models/asistencia-miembro-reunion';
import { AsistenciaMiembroReunionService } from '../../../../services/private/asistencia-miembro-reunion.service';
import swal from 'sweetalert2';
import { AuthService } from '../../../../auth/auth.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reunion-display',
  templateUrl: './reunion-display.component.html',
  styles: [],
})
export class ReunionDisplayComponent implements OnInit {
  public reunion: Reunion;
  public asistencias: AsistenciaMiembroReunion[];
  private asistenciasSeleccionadas: string[] = [];

  public asistenciaForm: FormGroup = this.fb.group({
    asistencias: new FormArray([]),
  });

  public esPresidente = this.authService.tieneRol('PRESIDENTE');

  private idObjectReunion: ObjectId;

  constructor(
    private reunionService: ReunionService,
    private asistenciaMiembroReunionService: AsistenciaMiembroReunionService,
    private utils: UtilsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getReunion(params['id']);
    });
  }

  private getReunion(reunionId: string): void {
    this.idObjectReunion = this.utils.convertirObjectId(reunionId);
    if (this.idObjectReunion !== undefined) {
      this.reunionService
        .getReunion(this.idObjectReunion)
        .subscribe((reunion) => {
          reunion.estadoReunion =
            reunion.estadoReunion[0].toUpperCase() +
            reunion.estadoReunion.substr(1).toLowerCase();
          reunion.tipoReunion =
            reunion.tipoReunion === 'ASOCIACION'
              ? 'Asociación'
              : 'Junta directiva';
          this.reunion = reunion;
          if (reunion.estadoReunion === 'Realizado') {
            this.asistenciaMiembroReunionService
              .getAsistencias(this.reunion._id)
              .subscribe((asistencias) => {
                this.asistencias = asistencias;
                this.addCheckboxes();
              });
          }
        });
    }
  }

  public asistenciasFormArray() {
    return this.asistenciaForm.controls.asistencias as FormArray;
  }

  private addCheckboxes() {
    this.asistenciasFormArray().clear();
    this.asistencias.forEach(() =>
      this.asistenciasFormArray().push(new FormControl(false))
    );
  }

  public onSubmit(event): void {
    if (event.submitter.name.length !== 0) {
      this.asistenciasSeleccionadas = this.asistenciaForm.value.asistencias
        .map((checked, i) => (checked ? this.asistencias[i]._id : null))
        .filter((v) => v !== null);
      if (this.asistenciasSeleccionadas.length !== 0) {
        const data = new FormData();
        for (let i = 0; i < this.asistenciasSeleccionadas.length; i++) {
          data.append('asistencias[]', this.asistenciasSeleccionadas[i]);
        }
        if (event.submitter.name === 'verificar') {
          swal
            .fire({
              title: '¿Estás seguro de verificar las asistencias marcadas?',
              text: 'No habrá forma de reventir esto',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#06d79c',
              cancelButtonColor: '#2f3d4a',
              confirmButtonText: 'Sí, verificar',
            })
            .then((res) => {
              if (res.isConfirmed) {
                this.asistenciaMiembroReunionService
                  .verificarAsistencia(data, this.reunion._id)
                  .subscribe(
                    () => {
                      swal
                        .fire(
                          'Asistencias verificadas',
                          'Las asistencias seleccionadas se han verificado correctamente',
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
      } else {
        swal.fire(
          'Error',
          'Necesitas marcar al menos una asistencia para verificar',
          'error'
        );
      }
    }
  }
}
