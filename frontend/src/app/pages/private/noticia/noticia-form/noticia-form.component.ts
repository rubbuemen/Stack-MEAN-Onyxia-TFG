import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectId } from 'mongoose';
import { Noticia } from '../../../../models/noticia.model';

import { NoticiaService } from '../../../../services/private/noticia.service';
import { MaterialService } from '../../../../services/private/material.service';

import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';
import { Material } from '../../../../models/material.model';

@Component({
  selector: 'app-noticia-form',
  templateUrl: './noticia-form.component.html',
  styles: [],
})
export class NoticiaFormComponent implements OnInit {
  public noticia: Noticia;
  public edicion: boolean = true;
  public formEnviado: boolean = false;
  public noticiaForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private noticiaService: NoticiaService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.utils.resetDropify();

    this.noticiaForm = this.fb.group({
      titulo: ['', Validators.required],
      cuerpo: ['', Validators.required],
      imagen: [''],
      hayImagen: [false],
    });
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getNoticia(params['id']);
      } else {
        this.edicion = false;
      }
    });
  }

  private getNoticia(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.noticiaService.getNoticia(this.idObject).subscribe(
        (noticia) => {
          this.noticia = noticia;
          this.noticiaForm.get('titulo').setValue(this.noticia.titulo);
          this.noticiaForm.get('cuerpo').setValue(this.noticia.cuerpo);
          if (this.utils.existe(noticia.imagen)) {
            let imagen =
              'data:' +
              noticia.imagen.mimetype +
              ';base64,' +
              noticia.imagen.data;
            this.utils.setearImagenFileHtml(imagen);
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
    if (this.noticiaForm.valid) {
      this.noticiaForm
        .get('hayImagen')
        .setValue(this.utils.contieneImagenDropify());
      const data = this.utils.generarFormData(
        this.noticiaForm,
        this.utils.obtenerPropiedadesFormGroup(this.noticiaForm)
      );
      if (this.edicion) {
        this.noticiaService.editarNoticia(data, this.idObject).subscribe(
          (res) => {
            swal
              .fire(
                'Datos editados',
                'Se ha editado la noticia correctamente',
                'success'
              )
              .then(() => this.router.navigate(['/private/noticia']));
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
      } else {
        this.noticiaService.crearNoticia(data).subscribe(
          (res) => {
            swal
              .fire(
                'Datos creados',
                'Se ha creado la noticia correctamente',
                'success'
              )
              .then(() => this.router.navigate(['/private/noticia']));
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
      }
    }
  }

  onFileChange(event) {
    if (event.target['files'].length > 0) {
      const file = event.target['files'][0];
      this.noticiaForm.get('imagen').setValue(file);
      this.noticiaForm.get('imagen').updateValueAndValidity();
    }
  }

  public validarCampo(campo: string): boolean {
    return this.noticiaForm.get(campo).invalid ? true : false;
  }
}
