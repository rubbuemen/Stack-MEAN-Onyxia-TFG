import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { AlbumFotografia } from '../../models/album-fotografia.model';

import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AlbumFotografiaService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getAlbumesFotografiasByEvento(
    eventoId: ObjectId
  ): Observable<AlbumFotografia[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/albumFotografia/list`,
        {},
        {},
        true,
        [AlbumFotografia],
        eventoId
      )
      .pipe(
        map(
          (res: { albumesFotografias: AlbumFotografia[] }) =>
            res.albumesFotografias
        )
      );
  }

  public getAlbumFotografias(id: ObjectId): Observable<AlbumFotografia> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/albumFotografia`,
        {},
        {},
        true,
        [AlbumFotografia],
        id
      )
      .pipe(
        map(
          (res: { albumFotografias: AlbumFotografia }) => res.albumFotografias
        )
      );
  }

  public editarAlbumFotografia(
    data: FormData,
    id: ObjectId
  ): Observable<AlbumFotografia> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/albumFotografia/edit`,
        data,
        {},
        true,
        [AlbumFotografia],
        id
      )
      .pipe(
        map((res: { albumFotografia: AlbumFotografia }) => res.albumFotografia)
      );
  }

  public crearAlbumFotografia(
    data: FormData,
    eventoId: ObjectId
  ): Observable<AlbumFotografia> {
    return this.requestConstructorService
      .request(
        'POST',
        `${base_url}/albumFotografia`,
        data,
        {},
        true,
        [AlbumFotografia],
        eventoId
      )
      .pipe(
        map((res: { albumFotografia: AlbumFotografia }) => res.albumFotografia)
      );
  }

  public eliminarAlbumFotografia(id: ObjectId): Observable<AlbumFotografia> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/albumFotografia/delete`,
        {},
        {},
        true,
        [AlbumFotografia],
        id
      )
      .pipe(
        map((res: { albumFotografia: AlbumFotografia }) => res.albumFotografia)
      );
  }
}
