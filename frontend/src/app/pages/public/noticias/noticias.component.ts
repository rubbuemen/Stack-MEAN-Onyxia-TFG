import { Component, OnInit } from '@angular/core';

import { NoticiaService } from '../../../services/public/noticia.service';
import { UtilsService } from '../../../services/utils.service';

import { Noticia } from '../../../models/noticia.model';

import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
})
export class NoticiasPublicComponent implements OnInit {
  faUser = faUser;
  faCalendar = faCalendarAlt;

  public noticias: Noticia[] = [];
  public page: number;

  constructor(
    private noticiaService: NoticiaService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.getNoticias();
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
    });
  }
}
