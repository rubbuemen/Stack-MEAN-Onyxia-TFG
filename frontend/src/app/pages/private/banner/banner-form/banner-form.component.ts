import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectId } from 'mongoose';
import { Banner } from '../../../../models/banner.model';

import { BannerService } from '../../../../services/private/banner.service';

import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';
import { Material } from '../../../../models/material.model';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styles: [],
})
export class BannerFormComponent implements OnInit {
  public banner: Banner;
  public materiales: Material[];
  public edicion: boolean = true;
  public formEnviado: boolean = false;
  public bannerForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private bannerService: BannerService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bannerForm = this.fb.group({
      orden: [''],
      texto: [''],
      imagen: [''],
    });
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getBanner(params['id']);
        this.utils.eliminarElementoJquery('rowImagen');
      } else {
        this.edicion = false;
        this.utils.resetDropify();
        this.utils.eliminarElementoJquery('colOrden');
      }
    });
  }

  private getBanner(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.bannerService.getBanner(this.idObject).subscribe(
        (banner) => {
          this.banner = banner;
          this.bannerForm.get('texto').setValue(this.banner.texto);
          this.bannerForm.get('orden').setValue(this.banner.orden);
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.bannerForm.valid) {
      const data = this.utils.generarFormData(
        this.bannerForm,
        this.utils.obtenerPropiedadesFormGroup(this.bannerForm)
      );
      if (this.edicion) {
        this.bannerService.editarBanner(data, this.idObject).subscribe(
          (res) => {
            swal
              .fire(
                'Datos editados',
                'Se ha editado el banner correctamente',
                'success'
              )
              .then(() => this.router.navigate(['/private/banner']));
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
      } else {
        if (this.bannerForm.get('imagen').value) {
          this.bannerService.crearBanner(data).subscribe(
            (res) => {
              swal
                .fire(
                  'Datos creados',
                  'Se ha creado el banner correctamente',
                  'success'
                )
                .then(() => this.router.navigate(['/private/banner']));
            },
            (error) => {
              swal.fire('Error', error.error.error, 'error');
            }
          );
        } else {
          swal.fire('Error', 'Inserta una imagen para el banner', 'error');
        }
      }
    }
  }

  onFileChange(event) {
    if (event.target['files'].length > 0) {
      const file = event.target['files'][0];
      this.bannerForm.get('imagen').setValue(file);
      this.bannerForm.get('imagen').updateValueAndValidity();
    }
  }

  public validarCampo(campo: string): boolean {
    return this.bannerForm.get(campo).invalid ? true : false;
  }
}
