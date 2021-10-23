import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

import { ObjectId } from 'mongoose';
import { Reunion } from '../../../../models/reunion.model';

import { ReunionService } from '../../../../services/private/reunion.service';

import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';
import { AsistenciaMiembroReunionService } from '../../../../services/private/asistencia-miembro-reunion.service';

@Component({
  selector: 'app-reunion-marcar-asistencia-form',
  templateUrl: './reunion-marcar-asistencia-form.component.html',
  styles: [],
})
export class ReunionMarcarAsistenciaFormComponent implements OnInit {
  public reunion: Reunion;
  public reunionForm: FormGroup;
  private idObjectReunion: ObjectId;

  constructor(
    private reunionService: ReunionService,
    private asistenciaMiembroReunionService: AsistenciaMiembroReunionService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getReunion(params['reunionId']);
      this.reunionForm = this.fb.group({
        comentarioAdicional: [''],
        haMarcadoAsistencia: [true, Validators.required],
      });
    });
  }

  private getReunion(id: string): void {
    this.idObjectReunion = this.utils.convertirObjectId(id);
    if (this.idObjectReunion !== undefined) {
      this.reunionService.getReunion(this.idObjectReunion).subscribe(
        (reunion) => {
          this.reunion = reunion;
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    if (this.reunionForm.valid) {
      const data = this.utils.generarFormData(
        this.reunionForm,
        this.utils.obtenerPropiedadesFormGroup(this.reunionForm)
      );
      this.asistenciaMiembroReunionService
        .marcarAsistencia(data, this.reunion._id)
        .subscribe(
          (res) => {
            swal
              .fire(
                'Asistencia marcada',
                'Se ha marcado tu asistencia a la reunión correctamente',
                'success'
              )
              .then(() =>
                this.router.navigate(['/private/reunion/pendientes'])
              );
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
    }
  }
}
