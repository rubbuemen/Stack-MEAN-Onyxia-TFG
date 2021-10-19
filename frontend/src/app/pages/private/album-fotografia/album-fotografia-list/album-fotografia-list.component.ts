import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlbumFotografia } from '../../../../models/album-fotografia.model';
import { AlbumFotografiaService } from '../../../../services/private/album-fotografia.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Evento } from '../../../../models/evento.model';
import { EventoService } from 'src/app/services/private/evento.service';
import { SharedDataService } from '../../../../services/shared-data.service';

@Component({
  selector: 'app-album-fotografia-list',
  templateUrl: './album-fotografia-list.component.html',
  styles: [],
})
export class AlbumFotografiaListComponent implements OnDestroy, OnInit {
  public evento: Evento;
  public albumFotografias: AlbumFotografia[];
  private idObjectEvento: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private albumFotografiaService: AlbumFotografiaService,
    private eventoService: EventoService,
    private sharedDataService: SharedDataService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.route.params.subscribe((params) => {
      this.getEvento(params['eventoId']);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getEvento(eventoId: string): void {
    this.idObjectEvento = this.utils.convertirObjectId(eventoId);
    if (this.idObjectEvento !== undefined) {
      this.eventoService.getEvento(this.idObjectEvento).subscribe((evento) => {
        this.albumFotografiaService
          .getAlbumesFotografiasByEvento(this.idObjectEvento)
          .subscribe((albumes) => {
            albumes.forEach((album) => {
              let imagen =
                'data:' +
                album.fotografias[0].imagen.mimetype +
                ';base64,' +
                album.fotografias[0].imagen.data;
              const imagenSRC = this.utils.usarImagenBase64(imagen);
              album.fotografias[0].imagen = imagenSRC;
            });
            this.albumFotografias = albumes;
            this.dtTrigger.next();
          });
        this.evento = evento;
        this.sharedDataService.changeEvento(this.evento);
      });
    }
  }

  public eliminarAlbum(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar este álbum de fotografías?',
          text: 'Todas las fotografías del álbum serán eliminadas y no habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.albumFotografiaService
              .eliminarAlbumFotografia(idObject)
              .subscribe(
                () => {
                  swal
                    .fire(
                      'Datos eliminados',
                      'Se ha eliminado el álbum de fotografías correctamente',
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
