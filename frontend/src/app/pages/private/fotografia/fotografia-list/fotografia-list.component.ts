import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fotografia } from '../../../../models/fotografia.model';
import { FotografiaService } from '../../../../services/private/fotografia.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AlbumFotografia } from '../../../../models/album-fotografia.model';
import { AlbumFotografiaService } from '../../../../services/private/album-fotografia.service';
import { Evento } from '../../../../models/evento.model';
import { SharedDataService } from '../../../../services/shared-data.service';

@Component({
  selector: 'app-fotografia-list',
  templateUrl: './fotografia-list.component.html',
  styles: [],
})
export class FotografiaListComponent implements OnDestroy, OnInit {
  public albumFotografia: AlbumFotografia;
  public evento: Evento;
  public fotografias: Fotografia[];
  private idObjectAlbumFotografias: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private fotografiaService: FotografiaService,
    private albumFotografiaService: AlbumFotografiaService,
    private sharedDataService: SharedDataService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sharedDataService.currentEvento.subscribe(
      (evento) => (this.evento = evento)
    );
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.route.params.subscribe((params) => {
      this.getAlbumFotografias(params['albumFotografiasId']);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getAlbumFotografias(albumFotografiasId: string): void {
    this.idObjectAlbumFotografias =
      this.utils.convertirObjectId(albumFotografiasId);
    if (this.idObjectAlbumFotografias !== undefined) {
      this.albumFotografiaService
        .getAlbumFotografias(this.idObjectAlbumFotografias)
        .subscribe((albumFotografia) => {
          this.fotografiaService
            .getFotografiasByAlbum(this.idObjectAlbumFotografias)
            .subscribe((fotografias) => {
              fotografias.forEach((fotografia) => {
                let imagen =
                  'data:' +
                  fotografia.imagen.mimetype +
                  ';base64,' +
                  fotografia.imagen.data;
                const imagenSRC = this.utils.usarImagenBase64(imagen);
                fotografia.imagen = imagenSRC;
              });
              this.fotografias = fotografias;
              this.dtTrigger.next();
            });
          this.albumFotografia = albumFotografia;
        });
    }
  }

  public eliminarFotografia(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar esta fotografía?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.fotografiaService.eliminarFotografia(idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Datos eliminados',
                    'Se ha eliminado la fotografía correctamente',
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
