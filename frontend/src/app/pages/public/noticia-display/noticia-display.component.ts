import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Noticia } from '../../../models/noticia.model';

import { NoticiaService } from '../../../services/public/noticia.service';
import { UtilsService } from '../../../services/utils.service';

import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-noticia-display',
  templateUrl: './noticia-display.component.html',
  styleUrls: ['./noticia-display.component.css'],
})
export class NoticiaDisplayPublicComponent {
  faUser = faUser;
  faCalendar = faCalendarAlt;

  public noticia: Noticia;

  constructor(
    private noticiaService: NoticiaService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getNoticia(params['id']);
    });
  }

  private getNoticia(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      this.noticiaService.getNoticia(idObject).subscribe(
        (noticia) => {
          if (this.utils.existe(noticia.imagen)) {
            let imagen =
              'data:' +
              noticia.imagen.mimetype +
              ';base64,' +
              noticia.imagen.data;
            const imagenSRC = this.utils.usarImagenBase64(imagen);
            noticia.imagen = imagenSRC;
          }
          this.noticia = noticia;
        },
        (error) => {
          this.router.navigate(['/']);
        }
      );
    }
  }
}
