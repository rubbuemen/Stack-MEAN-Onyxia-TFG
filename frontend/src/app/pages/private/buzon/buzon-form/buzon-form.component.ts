import { Component, OnInit } from '@angular/core';

import { Buzon } from '../../../../models/buzon.model';

import { BuzonService } from '../../../../services/private/buzon.service';
import { AuthService } from '../../../../auth/auth.service';

import { UtilsService } from '../../../../services/utils.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert2';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'app-buzon-form',
  templateUrl: './buzon-form.component.html',
})
export class BuzonFormComponent implements OnInit {
  public buzon: Buzon;
  public edicion: boolean = true;
  public formEnviado: boolean = false;
  public buzonForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private buzonService: BuzonService,
    private utils: UtilsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buzonForm = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getBuzon(params['id']);
      } else {
        this.edicion = false;
      }
    });
  }

  private getBuzon(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.buzonService.getBuzon(this.idObject).subscribe(
        (buzon) => {
          this.buzon = buzon;
          this.buzonForm.get('nombre').setValue(this.buzon.nombre);
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.buzonForm.valid) {
      const data = this.utils.generarFormData(
        this.buzonForm,
        this.utils.obtenerPropiedadesFormGroup(this.buzonForm)
      );
      if (this.edicion) {
        this.buzonService.editarBuzon(data, this.idObject).subscribe(
          (res) => {
            swal
              .fire(
                'Datos editados',
                'Se ha editado el buzón correctamente',
                'success'
              )
              .then(() =>
                this.router.navigate(['/private/notificacion/bandeja'])
              );
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
      } else {
        this.buzonService.crearBuzon(data).subscribe(
          (res) => {
            swal
              .fire(
                'Datos creados',
                'Se ha creado el buzón correctamente',
                'success'
              )
              .then(() =>
                this.router.navigate(['/private/notificacion/bandeja'])
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
    return this.buzonForm.get(campo).invalid ? true : false;
  }
}
