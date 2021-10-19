import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectId } from 'mongoose';
import { AlbumFotografia } from '../../../../models/album-fotografia.model';

import { AlbumFotografiaService } from '../../../../services/private/album-fotografia.service';
import { EventoService } from '../../../../services/private/evento.service';

import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';
import { Evento } from '../../../../models/evento.model';
import { SharedDataService } from '../../../../services/shared-data.service';

@Component({
  selector: 'app-album-fotografia-form',
  templateUrl: './album-fotografia-form.component.html',
  styles: [],
})
export class AlbumFotografiaFormComponent implements OnInit {
  public albumFotografias: AlbumFotografia;
  public evento: Evento;
  public edicion: boolean = true;
  public formEnviado: boolean = false;
  public albumFotografiasForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private albumFotografiasService: AlbumFotografiaService,
    private sharedDataService: SharedDataService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sharedDataService.currentEvento.subscribe(
      (evento) => (this.evento = evento)
    );
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getAlbumFotografias(params['id']);
        this.utils.eliminarElementoJquery('colFotografia');
      } else {
        this.edicion = false;
        this.utils.resetDropify();
      }
    });
    this.albumFotografiasForm = this.generarAlbumFotografiasForm();
  }

  private generarAlbumFotografiasForm(): FormGroup {
    if (!this.edicion) {
      return this.fb.group({
        nombre: ['', Validators.required],
        imagen: [''],
      });
    } else {
      return this.fb.group({
        nombre: ['', Validators.required],
      });
    }
  }

  private getAlbumFotografias(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.albumFotografiasService.getAlbumFotografias(this.idObject).subscribe(
        (albumFotografias) => {
          this.albumFotografias = albumFotografias;
          this.albumFotografiasForm
            .get('nombre')
            .setValue(this.albumFotografias.nombre);
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.albumFotografiasForm.valid) {
      const data = this.utils.generarFormData(
        this.albumFotografiasForm,
        this.utils.obtenerPropiedadesFormGroup(this.albumFotografiasForm)
      );
      if (this.edicion) {
        this.albumFotografiasService
          .editarAlbumFotografia(data, this.idObject)
          .subscribe(
            (res) => {
              swal
                .fire(
                  'Datos editados',
                  'Se ha editado el álbum de fotografias correctamente',
                  'success'
                )
                .then(() =>
                  this.router.navigate([
                    '/private/album-fotografia',
                    this.evento._id,
                  ])
                );
            },
            (error) => {
              swal.fire('Error', error.error.error, 'error');
            }
          );
      } else {
        if (this.albumFotografiasForm.get('imagen').value) {
          this.albumFotografiasService
            .crearAlbumFotografia(data, this.evento._id)
            .subscribe(
              (res) => {
                swal
                  .fire(
                    'Datos creados',
                    'Se ha creado el álbum de fotografias correctamente',
                    'success'
                  )
                  .then(() =>
                    this.router.navigate([
                      '/private/album-fotografia',
                      this.evento._id,
                    ])
                  );
              },
              (error) => {
                swal.fire('Error', error.error.error, 'error');
              }
            );
        } else {
          swal.fire(
            'Error',
            'Inserta una primera imagen para el album de fotografias',
            'error'
          );
        }
      }
    }
  }

  onFileChange(event) {
    if (event.target['files'].length > 0) {
      const file = event.target['files'][0];
      this.albumFotografiasForm.get('imagen').setValue(file);
      this.albumFotografiasForm.get('imagen').updateValueAndValidity();
    }
  }

  public validarCampo(campo: string): boolean {
    return this.albumFotografiasForm.get(campo).invalid ? true : false;
  }
}
