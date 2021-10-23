import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

import { ObjectId } from 'mongoose';
import { Reunion } from '../../../../models/reunion.model';

import { ReunionService } from '../../../../services/private/reunion.service';

import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-reunion-form',
  templateUrl: './reunion-form.component.html',
  styles: [],
})
export class ReunionFormComponent implements OnInit {
  public reunion: Reunion;
  public edicion: boolean = true;
  public realizado: boolean = false;
  public formEnviado: boolean = false;
  public reunionForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private reunionService: ReunionService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getReunion(params['id']);
      } else {
        this.edicion = false;
        this.utils.refrescarSelectPicker('tipoReunion');
        this.reunionForm = this.generarReunionForm();
      }
    });
  }

  private generarReunionForm(): FormGroup {
    if (!this.realizado) {
      return this.fb.group({
        fecha: ['', Validators.required],
        horaInicio: ['', Validators.required],
        horaFin: ['', Validators.required],
        lugar: ['', Validators.required],
        tipoReunion: ['', Validators.required],
        temasATratar: [''],
      });
    } else {
      return this.fb.group({
        decisionesTomadas: ['', Validators.required],
        actaReunion: ['', Validators.required],
      });
    }
  }

  private getReunion(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.reunionService.getReunion(this.idObject).subscribe(
        (reunion) => {
          this.reunion = reunion;
          if (this.reunion.estadoReunion === 'REALIZADO') {
            this.realizado = true;
            this.reunionForm = this.generarReunionForm();
            if (this.reunion.decisionesTomadas) {
              this.reunionForm
                .get('decisionesTomadas')
                .setValue(this.reunion.decisionesTomadas);
            }
            if (this.reunion.actaReunion) {
              this.reunionForm
                .get('actaReunion')
                .setValue(this.reunion.actaReunion);
            }
          } else {
            this.reunionForm = this.generarReunionForm();
            this.reunionForm
              .get('fecha')
              .setValue(formatDate(this.reunion.fecha, 'yyyy-MM-dd', 'en'));
            this.reunionForm
              .get('horaInicio')
              .setValue(this.reunion.horaInicio);
            this.reunionForm.get('horaFin').setValue(this.reunion.horaFin);
            this.reunionForm.get('lugar').setValue(this.reunion.lugar);
            this.reunionForm
              .get('tipoReunion')
              .setValue(this.reunion.tipoReunion);
            this.utils.setValoresSelectPicker(
              'tipoReunion',
              this.reunion.tipoReunion.toString()
            );
            this.reunionForm
              .get('temasATratar')
              .setValue(this.reunion.temasATratar);
          }
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.reunionForm.valid) {
      const data = this.utils.generarFormData(
        this.reunionForm,
        this.utils.obtenerPropiedadesFormGroup(this.reunionForm)
      );
      if (this.edicion) {
        if (!this.realizado) {
          this.reunionService.editarReunion(data, this.idObject).subscribe(
            (res) => {
              swal
                .fire(
                  'Datos editados',
                  'Se ha editado la reunión correctamente',
                  'success'
                )
                .then(() => this.router.navigate(['/private/reunion/gestion']));
            },
            (error) => {
              swal.fire('Error', error.error.error, 'error');
            }
          );
        } else {
          this.reunionService
            .editarReunionRealizada(data, this.idObject)
            .subscribe(
              (res) => {
                swal
                  .fire(
                    'Datos editados',
                    'Se ha editado la reunión correctamente',
                    'success'
                  )
                  .then(() =>
                    this.router.navigate(['/private/reunion/gestion'])
                  );
              },
              (error) => {
                swal.fire('Error', error.error.error, 'error');
              }
            );
        }
      } else {
        this.reunionService.crearReunion(data).subscribe(
          (res) => {
            swal
              .fire(
                'Datos creados',
                'Se ha creado la reunión correctamente',
                'success'
              )
              .then(() => this.router.navigate(['/private/reunion/gestion']));
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
      }
    }
  }

  public validarCampo(campo: string): boolean {
    return this.reunionForm.get(campo).invalid ? true : false;
  }
}
