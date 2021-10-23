import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Reunion } from '../../models/reunion.model';

import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ReunionService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getReuniones(): Observable<Reunion[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/reunion/list`, {}, {}, true, [Reunion])
      .pipe(map((res: { reuniones: Reunion[] }) => res.reuniones));
  }

  public getReunion(id: ObjectId): Observable<Reunion> {
    return this.requestConstructorService
      .request('GET', `${base_url}/reunion`, {}, {}, true, [Reunion], id)
      .pipe(map((res: { reunion: Reunion }) => res.reunion));
  }

  public editarReunion(data: FormData, id: ObjectId): Observable<Reunion> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/reunion/edit`, data, {}, true, [Reunion], id)
      .pipe(map((res: { reunion: Reunion }) => res.reunion));
  }

  public editarReunionRealizada(
    data: FormData,
    id: ObjectId
  ): Observable<Reunion> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/reunion/editRealizada`,
        data,
        {},
        true,
        [Reunion],
        id
      )
      .pipe(map((res: { reunion: Reunion }) => res.reunion));
  }

  public crearReunion(data: FormData): Observable<Reunion> {
    return this.requestConstructorService
      .request('POST', `${base_url}/reunion`, data, {}, true, [Reunion])
      .pipe(map((res: { reunion: Reunion }) => res.reunion));
  }

  public eliminarReunion(id: ObjectId): Observable<Reunion> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/reunion/delete`,
        {},
        {},
        true,
        [Reunion],
        id
      )
      .pipe(map((res: { reunion: Reunion }) => res.reunion));
  }

  public cancelarReunion(id: ObjectId): Observable<Reunion> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/reunion/cancelar`,
        {},
        {},
        true,
        [Reunion],
        id
      )
      .pipe(map((res: { reunion: Reunion }) => res.reunion));
  }

  public getReunionesPendientes(): Observable<Reunion[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/reunion/pendientes`, {}, {}, true, [Reunion])
      .pipe(map((res: { reuniones: Reunion[] }) => res.reuniones));
  }

  public getReunionesRealizadas(): Observable<Reunion[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/reunion/realizadas`, {}, {}, true, [Reunion])
      .pipe(map((res: { reuniones: Reunion[] }) => res.reuniones));
  }
}
