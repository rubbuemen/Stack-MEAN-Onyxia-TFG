import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { RedSocial } from '../../models/red-social.model';

import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class RedSocialService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getMisRedesSociales(): Observable<RedSocial[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/redSocial/mylist`, {}, {}, true, [RedSocial])
      .pipe(map((res: { redesSociales: RedSocial[] }) => res.redesSociales));
  }

  public getRedSocial(id: ObjectId): Observable<RedSocial> {
    return this.requestConstructorService
      .request('GET', `${base_url}/redSocial`, {}, {}, true, [RedSocial], id)
      .pipe(map((res: { redSocial: RedSocial }) => res.redSocial));
  }

  public getRedesSocialesByActor(id: ObjectId): Observable<RedSocial[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/redSocial/list`,
        {},
        {},
        true,
        [RedSocial],
        id
      )
      .pipe(map((res: { redesSociales: RedSocial[] }) => res.redesSociales));
  }

  public editarRedSocial(data: FormData, id: ObjectId): Observable<RedSocial> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/redSocial/edit`,
        data,
        {},
        true,
        [RedSocial],
        id
      )
      .pipe(map((res: { redSocial: RedSocial }) => res.redSocial));
  }

  public crearRedSocial(data: FormData): Observable<RedSocial> {
    return this.requestConstructorService
      .request('POST', `${base_url}/redSocial`, data, {}, true, [RedSocial])
      .pipe(map((res: { redSocial: RedSocial }) => res.redSocial));
  }

  public eliminarRedSocial(id: ObjectId): Observable<RedSocial> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/redSocial/delete`,
        {},
        {},
        true,
        [RedSocial],
        id
      )
      .pipe(map((res: { redSocial: RedSocial }) => res.redSocial));
  }
}
