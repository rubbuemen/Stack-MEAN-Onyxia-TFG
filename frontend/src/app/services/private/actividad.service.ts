import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Actividad } from '../../models/actividad.model';

import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ActividadService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getActividades(): Observable<Actividad[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/actividad/list`, {}, {}, true, [Actividad])
      .pipe(map((res: { actividades: Actividad[] }) => res.actividades));
  }

  public getActividadesPublicasEnVigor(): Observable<Actividad[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/actividad/listPubEnVigor`, {}, {}, true, [
        Actividad,
      ])
      .pipe(map((res: { actividades: Actividad[] }) => res.actividades));
  }

  public getActividadesEnVigor(): Observable<Actividad[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/actividad/listEnVigor`, {}, {}, true, [
        Actividad,
      ])
      .pipe(map((res: { actividades: Actividad[] }) => res.actividades));
  }

  public getActividad(id: ObjectId): Observable<Actividad> {
    return this.requestConstructorService
      .request('GET', `${base_url}/actividad`, {}, {}, true, [Actividad], id)
      .pipe(map((res: { actividad: Actividad }) => res.actividad));
  }

  public getActividadesEvento(id: ObjectId): Observable<Actividad[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/actividad/list`,
        {},
        {},
        true,
        [Actividad],
        id
      )
      .pipe(map((res: { actividades: Actividad[] }) => res.actividades));
  }

  public editarActividad(data: FormData, id: ObjectId): Observable<Actividad> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/actividad/edit`,
        data,
        {},
        true,
        [Actividad],
        id
      )
      .pipe(map((res: { actividad: Actividad }) => res.actividad));
  }

  public crearActividad(data: FormData): Observable<Actividad> {
    return this.requestConstructorService
      .request('POST', `${base_url}/actividad`, data, {}, true, [Actividad])
      .pipe(map((res: { actividad: Actividad }) => res.actividad));
  }

  public eliminarActividad(id: ObjectId): Observable<Actividad> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/actividad/delete`,
        {},
        {},
        true,
        [Actividad],
        id
      )
      .pipe(map((res: { actividad: Actividad }) => res.actividad));
  }

  public descatalogarActividad(id: ObjectId): Observable<Actividad> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/actividad/descatalogar`,
        {},
        {},
        true,
        [Actividad],
        id
      )
      .pipe(map((res: { actividad: Actividad }) => res.actividad));
  }

  public catalogarActividad(id: ObjectId): Observable<Actividad> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/actividad/catalogar`,
        {},
        {},
        true,
        [Actividad],
        id
      )
      .pipe(map((res: { actividad: Actividad }) => res.actividad));
  }

  public publicarActividad(id: ObjectId): Observable<Actividad> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/actividad/publicar`,
        {},
        {},
        true,
        [Actividad],
        id
      )
      .pipe(map((res: { actividad: Actividad }) => res.actividad));
  }

  public ocultarActividad(id: ObjectId): Observable<Actividad> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/actividad/ocultar`,
        {},
        {},
        true,
        [Actividad],
        id
      )
      .pipe(map((res: { actividad: Actividad }) => res.actividad));
  }
}
