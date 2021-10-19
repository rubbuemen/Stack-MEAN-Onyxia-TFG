import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Fotografia } from '../../models/fotografia.model';

import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FotografiaService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getFotografiasByAlbum(eventoId: ObjectId): Observable<Fotografia[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/fotografia/list`,
        {},
        {},
        true,
        [Fotografia],
        eventoId
      )
      .pipe(map((res: { fotografias: Fotografia[] }) => res.fotografias));
  }

  public crearFotografia(
    data: FormData,
    albumFotografiasId: ObjectId
  ): Observable<Fotografia[]> {
    return this.requestConstructorService
      .request(
        'POST',
        `${base_url}/fotografia`,
        data,
        {},
        true,
        [Fotografia],
        albumFotografiasId
      )
      .pipe(map((res: { fotografias: Fotografia[] }) => res.fotografias));
  }

  public eliminarFotografia(id: ObjectId): Observable<Fotografia> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/fotografia/delete`,
        {},
        {},
        true,
        [Fotografia],
        id
      )
      .pipe(map((res: { fotografia: Fotografia }) => res.fotografia));
  }
}
