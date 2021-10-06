import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Buzon } from '../../models/buzon.model';
import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BuzonService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getBuzones(): Observable<Buzon[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/buzon/list`, {}, {}, true, [Buzon])
      .pipe(map((res: { buzones: Buzon[] }) => res.buzones));
  }

  public getBuzonEntrada(): Observable<Buzon> {
    return this.requestConstructorService
      .request('GET', `${base_url}/buzon/entrada`, {}, {}, true, [Buzon])
      .pipe(map((res: { buzon: Buzon }) => res.buzon));
  }

  public getBuzonSalida(): Observable<Buzon> {
    return this.requestConstructorService
      .request('GET', `${base_url}/buzon/salida`, {}, {}, true, [Buzon])
      .pipe(map((res: { buzon: Buzon }) => res.buzon));
  }

  public getBuzonPapelera(): Observable<Buzon> {
    return this.requestConstructorService
      .request('GET', `${base_url}/buzon/papelera`, {}, {}, true, [Buzon])
      .pipe(map((res: { buzon: Buzon }) => res.buzon));
  }

  public getMisBuzonesCreados(): Observable<Buzon[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/buzon/creados`, {}, {}, true, [Buzon])
      .pipe(map((res: { buzones: Buzon[] }) => res.buzones));
  }

  public getBuzon(id: ObjectId): Observable<Buzon> {
    return this.requestConstructorService
      .request('GET', `${base_url}/buzon`, {}, {}, true, [Buzon], id)
      .pipe(map((res: { buzon: Buzon }) => res.buzon));
  }

  public editarBuzon(data: FormData, id: ObjectId): Observable<Buzon> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/buzon/edit`, data, {}, true, [Buzon], id)
      .pipe(map((res: { buzon: Buzon }) => res.buzon));
  }

  public crearBuzon(data: FormData): Observable<Buzon> {
    return this.requestConstructorService
      .request('POST', `${base_url}/buzon`, data, {}, true, [Buzon])
      .pipe(map((res: { buzon: Buzon }) => res.buzon));
  }

  public eliminarBuzon(id: ObjectId): Observable<Buzon> {
    return this.requestConstructorService
      .request('DELETE', `${base_url}/buzon/delete`, {}, {}, true, [Buzon], id)
      .pipe(map((res: { buzon: Buzon }) => res.buzon));
  }
}
