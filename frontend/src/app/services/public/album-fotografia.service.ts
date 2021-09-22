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

  public getAlbumesFotografias(): Observable<AlbumFotografia[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/albumFotografia/list`, {}, {}, false, [
        AlbumFotografia,
      ])
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
        false,
        [AlbumFotografia],
        id
      )
      .pipe(
        map(
          (res: { albumFotografias: AlbumFotografia }) => res.albumFotografias
        )
      );
  }
}
