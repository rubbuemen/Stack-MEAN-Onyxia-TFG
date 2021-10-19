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
import { FotografiaService } from '../../../../services/private/fotografia.service';

@Component({
  selector: 'app-fotografia-form',
  templateUrl: './fotografia-form.component.html',
  styles: [],
})
export class FotografiaFormComponent implements OnInit {
  public albumFotografias: AlbumFotografia;
  public evento: Evento;
  public formEnviado: boolean = false;
  public fotografiaForm: FormGroup = this.fb.group({
    imagenes: [''],
  });
  private idObjectAlbumFotografias: ObjectId;

  constructor(
    private albumFotografiasService: AlbumFotografiaService,
    private fotografiaService: FotografiaService,
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
      this.getAlbumFotografias(params['albumFotografiasId']);
    });
    this.utils.resetDropify();
  }

  private getAlbumFotografias(id: string): void {
    this.idObjectAlbumFotografias = this.utils.convertirObjectId(id);
    if (this.idObjectAlbumFotografias !== undefined) {
      this.albumFotografiasService
        .getAlbumFotografias(this.idObjectAlbumFotografias)
        .subscribe(
          (albumFotografias) => {
            this.albumFotografias = albumFotografias;
          },
          (error) => {
            this.router.navigate(['/private']);
          }
        );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.fotografiaForm.valid) {
      const data = new FormData();
      for (const imagen of this.fotografiaForm.get('imagenes').value) {
        data.append('imagenes', imagen, imagen.name);
      }
      if (this.fotografiaForm.get('imagenes').value) {
        this.fotografiaService
          .crearFotografia(data, this.albumFotografias._id)
          .subscribe(
            (res) => {
              swal
                .fire(
                  'Datos creados',
                  'Se han añadido las fotografías correctamente',
                  'success'
                )
                .then(() =>
                  this.router.navigate([
                    '/private/fotografia',
                    this.albumFotografias._id,
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
          'Inserta al menos una fotografía para añadir',
          'error'
        );
      }
    }
  }

  onFileChange(event) {
    if (event.target['files'].length > 0) {
      let files = event.target['files'];
      this.fotografiaForm.get('imagenes').setValue(files);
      this.fotografiaForm.get('imagenes').updateValueAndValidity();
    }
  }

  public validarCampo(campo: string): boolean {
    return this.fotografiaForm.get(campo).invalid ? true : false;
  }
}
