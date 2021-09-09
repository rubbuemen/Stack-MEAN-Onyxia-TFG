import { Component, OnInit } from '@angular/core';

import { FotografiaService } from '../../../services/public/fotografia.service';
import { UtilsService } from '../../../services/utils.service';

import { Fotografia } from '../../../models/fotografia.model';

import { ActivatedRoute, Router } from '@angular/router';
import { AlbumFotografiaService } from '../../../services/public/album-fotografia.service';

@Component({
  selector: 'app-fotografias',
  templateUrl: './fotografias.component.html',
  styleUrls: ['./fotografias.component.css'],
})
export class FotografiasPublicComponent implements OnInit {
  public fotografias: Fotografia[] = [];
  public nombreAlbum: String;

  constructor(
    private fotografiaService: FotografiaService,
    private albumFotografiaService: AlbumFotografiaService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getFotografiasPorAlbum(params['albumFotografiasId']);
    });
  }

  private getFotografiasPorAlbum(albumId: string): void {
    const idObject = this.utils.convertirObjectId(albumId);
    if (idObject !== undefined) {
      this.albumFotografiaService.getAlbumFotografias(idObject).subscribe(
        (album) => {
          this.nombreAlbum = album.nombre;
        },
        (error) => {
          this.router.navigate(['/']);
        }
      );
      this.fotografiaService.getFotografiasPorAlbum(idObject).subscribe(
        (fotografias) => {
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
        },
        (error) => {
          this.router.navigate(['/']);
        }
      );
    }
  }
}
