import { Component, OnInit } from '@angular/core';

import { AlbumFotografiaService } from '../../../services/public/album-fotografia.service';
import { UtilsService } from '../../../services/utils.service';

import { AlbumFotografia } from '../../../models/album-fotografia.model';

@Component({
  selector: 'app-albumes-fotografias',
  templateUrl: './albumes-fotografias.component.html',
  styleUrls: ['./albumes-fotografias.component.css'],
})
export class AlbumesFotografiasPublicComponent implements OnInit {
  public albumesFotografias: AlbumFotografia[] = [];
  constructor(
    private albumFotografiaService: AlbumFotografiaService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.getAlbumesFotografias();
  }

  private getAlbumesFotografias(): void {
    this.albumFotografiaService.getAlbumesFotografias().subscribe((albumes) => {
      albumes.forEach((album) => {
        let imagen =
          'data:' +
          album.fotografias[0].imagen.mimetype +
          ';base64,' +
          album.fotografias[0].imagen.data;
        const imagenSRC = this.utils.usarImagenBase64(imagen);
        album.fotografias[0].imagen = imagenSRC;
      });
      this.albumesFotografias = albumes;
    });
  }
}
