import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongoose';
import { RedSocial } from '../../../../models/red-social.model';
import { RedSocialService } from '../../../../services/private/red-social.service';
import { UtilsService } from '../../../../services/utils.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-red-social-self-form',
  templateUrl: './red-social-self-form.component.html',
  styles: [],
})
export class RedSocialSelfFormComponent implements OnInit {
  public redSocial: RedSocial;
  public edicion: boolean = true;
  public formEnviado: boolean = false;
  public redSocialForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private redSocialService: RedSocialService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.redSocialForm = this.fb.group({
      nombre: ['', Validators.required],
      enlace: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getRedSocial(params['id']);
      } else {
        this.edicion = false;
      }
    });
  }

  private getRedSocial(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.redSocialService.getRedSocial(this.idObject).subscribe(
        (redSocial) => {
          this.redSocial = redSocial;
          this.redSocialForm.get('nombre').setValue(this.redSocial.nombre);
          this.redSocialForm.get('enlace').setValue(this.redSocial.enlace);
          this.redSocialForm.get('usuario').setValue(this.redSocial.usuario);
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.redSocialForm.valid) {
      const data = this.utils.generarFormData(
        this.redSocialForm,
        this.utils.obtenerPropiedadesFormGroup(this.redSocialForm)
      );
      if (this.edicion) {
        this.redSocialService.editarRedSocial(data, this.idObject).subscribe(
          (res) => {
            swal
              .fire(
                'Datos editados',
                'Se ha editado la red social correctamente',
                'success'
              )
              .then(() => this.router.navigate(['/private/red-social']));
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
      } else {
        this.redSocialService.crearRedSocial(data).subscribe(
          (res) => {
            swal
              .fire(
                'Datos creados',
                'Se ha creado la red social correctamente',
                'success'
              )
              .then(() => this.router.navigate(['/private/red-social']));
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
      }
    }
  }

  public validarCampo(campo: string): boolean {
    return this.redSocialForm.get(campo).invalid ? true : false;
  }
}
