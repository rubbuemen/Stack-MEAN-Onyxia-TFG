import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Noticia } from '../../models/noticia.model';
import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getNoticias(): Observable<Noticia[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/noticia/list`, {}, {}, false, [Noticia])
      .pipe(map((res: { noticias: Noticia[] }) => res.noticias));
  }

  public getNoticia(id: ObjectId): Observable<Noticia> {
    return this.requestConstructorService
      .request('GET', `${base_url}/noticia`, { id }, {}, false, [Noticia])
      .pipe(map((res: { noticia: Noticia }) => res.noticia));
  }
}
