import { Component, OnDestroy, OnInit } from '@angular/core';
import { Noticia } from '../../../../models/noticia.model';
import { NoticiaService } from '../../../../services/private/noticia.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-noticia-list',
  templateUrl: './noticia-list.component.html',
  styles: [],
})
export class NoticiaListComponent implements OnDestroy, OnInit {
  public noticias: Noticia[];
  private idObject: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private noticiaService: NoticiaService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.getNoticias();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getNoticias(): void {
    this.noticiaService.getNoticias().subscribe((noticias) => {
      noticias.forEach((noticia) => {
        if (this.utils.existe(noticia.imagen)) {
          let imagen =
            'data:' +
            noticia.imagen.mimetype +
            ';base64,' +
            noticia.imagen.data;
          const imagenSRC = this.utils.usarImagenBase64(imagen);
          noticia.imagen = imagenSRC;
        }
      });
      this.noticias = noticias;
      this.dtTrigger.next();
    });
  }

  public eliminarNoticia(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar la noticia?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.noticiaService.eliminarNoticia(this.idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Datos eliminados',
                    'Se ha eliminado la noticia correctamente',
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
  }
}
