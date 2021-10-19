import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectId } from 'mongoose';
import { TramoHorario } from '../../../../models/tramo-horario.model';

import { TramoHorarioService } from '../../../../services/private/tramo-horario.service';
import { MaterialService } from '../../../../services/private/material.service';

import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';
import { Material } from '../../../../models/material.model';
import { DiaEvento } from '../../../../models/dia-evento.model';
import { SharedDataService } from '../../../../services/shared-data.service';

@Component({
  selector: 'app-tramo-horario-form',
  templateUrl: './tramo-horario-form.component.html',
  styles: [],
})
export class TramoHorarioFormComponent implements OnInit {
  public tramoHorario: TramoHorario;
  public diaEvento: DiaEvento;
  public edicion: boolean = true;
  public formEnviado: boolean = false;
  public tramoHorarioForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private tramoHorarioService: TramoHorarioService,
    private sharedDataService: SharedDataService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tramoHorarioForm = this.fb.group({
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
    });
    this.sharedDataService.currentDiaEvento.subscribe((diaEvento) => {
      this.diaEvento = diaEvento;
    });
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getTramoHorario(params['id']);
      } else {
        this.edicion = false;
      }
    });
  }

  private getTramoHorario(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.tramoHorarioService.getTramoHorario(this.idObject).subscribe(
        (tramoHorario) => {
          this.tramoHorario = tramoHorario;
          this.tramoHorarioForm
            .get('horaInicio')
            .setValue(this.tramoHorario.horaInicio);
          this.tramoHorarioForm
            .get('horaFin')
            .setValue(this.tramoHorario.horaFin);
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.tramoHorarioForm.valid) {
      const data = this.utils.generarFormData(
        this.tramoHorarioForm,
        this.utils.obtenerPropiedadesFormGroup(this.tramoHorarioForm)
      );
      if (this.edicion) {
        this.tramoHorarioService
          .editarTramoHorario(data, this.idObject)
          .subscribe(
            (res) => {
              swal
                .fire(
                  'Datos editados',
                  'Se ha editado el tramo horario correctamente',
                  'success'
                )
                .then(() =>
                  this.router.navigate([
                    '/private/tramo-horario',
                    this.diaEvento._id,
                  ])
                );
            },
            (error) => {
              swal.fire('Error', error.error.error, 'error');
            }
          );
      } else {
        this.tramoHorarioService
          .aniadirTramoHorario(data, this.diaEvento._id)
          .subscribe(
            (res) => {
              swal
                .fire(
                  'Datos creados',
                  'Se ha creado el tramo horario correctamente',
                  'success'
                )
                .then(() =>
                  this.router.navigate([
                    '/private/tramo-horario',
                    this.diaEvento._id,
                  ])
                );
            },
            (error) => {
              swal.fire('Error', error.error.error, 'error');
            }
          );
      }
    }
  }

  public validarCampo(campo: string): boolean {
    return this.tramoHorarioForm.get(campo).invalid ? true : false;
  }
}
