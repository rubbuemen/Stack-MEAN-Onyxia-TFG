import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';

import { ObjectId } from 'mongoose';
import { Noticia } from '../../models/noticia.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getNoticias(): Observable<Noticia[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/noticia/list`, {}, {}, true, [Noticia])
      .pipe(map((res: { noticias: Noticia[] }) => res.noticias));
  }

  public getNoticia(id: ObjectId): Observable<Noticia> {
    return this.requestConstructorService
      .request('GET', `${base_url}/noticia`, {}, {}, true, [Noticia], id)
      .pipe(map((res: { noticia: Noticia }) => res.noticia));
  }

  public editarNoticia(data: FormData, id: ObjectId): Observable<Noticia> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/noticia/edit`, data, {}, true, [Noticia], id)
      .pipe(map((res: { noticia: Noticia }) => res.noticia));
  }

  public crearNoticia(data: FormData): Observable<Noticia> {
    return this.requestConstructorService
      .request('POST', `${base_url}/noticia`, data, {}, true, [Noticia])
      .pipe(map((res: { noticia: Noticia }) => res.noticia));
  }

  public eliminarNoticia(id: ObjectId): Observable<Noticia> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/noticia/delete`,
        {},
        {},
        true,
        [Noticia],
        id
      )
      .pipe(map((res: { noticia: Noticia }) => res.noticia));
  }
}
