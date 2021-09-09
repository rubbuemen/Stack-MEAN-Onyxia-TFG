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

  public getFotografiasPorAlbum(
    albumFotografiasId: ObjectId
  ): Observable<Fotografia[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/fotografia/list`,
        { albumFotografiasId },
        {},
        false,
        [Fotografia]
      )
      .pipe(map((res: { fotografias: Fotografia[] }) => res.fotografias));
  }
}
