import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Notificacion } from '../../models/notificacion.model';

import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getNotificacionesByBuzon(
    buzonId: ObjectId
  ): Observable<Notificacion[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/notificacion/list`,
        {},
        {},
        true,
        [Notificacion],
        buzonId
      )
      .pipe(
        map((res: { notificaciones: Notificacion[] }) =>
          res.notificaciones.sort((a, b) => {
            return a.fecha > b.fecha ? -1 : 1;
          })
        )
      );
  }

  public getNotificacionesLeidasByBuzonId(
    buzonId: ObjectId
  ): Observable<Notificacion[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/notificacion/list/leidos`,
        {},
        {},
        true,
        [Notificacion],
        buzonId
      )
      .pipe(
        map((res: { notificaciones: Notificacion[] }) =>
          res.notificaciones.sort((a, b) => {
            return a.fecha > b.fecha ? -1 : 1;
          })
        )
      );
  }

  public eliminarNotificaciones(data: FormData): Observable<Notificacion[]> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/notificacion/eliminar`, data, {}, true, [
        Notificacion,
      ])
      .pipe(
        map(
          (res: { notificacionesTratadas: Notificacion[] }) =>
            res.notificacionesTratadas
        )
      );
  }

  public moverNotificaciones(data: FormData): Observable<Notificacion[]> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/notificacion/mover`, data, {}, true, [
        Notificacion,
      ])
      .pipe(
        map(
          (res: { notificacionesTratadas: Notificacion[] }) =>
            res.notificacionesTratadas
        )
      );
  }

  public getNotificacion(id: ObjectId): Observable<Notificacion> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/notificacion`,
        {},
        {},
        true,
        [Notificacion],
        id
      )
      .pipe(map((res: { notificacion: Notificacion }) => res.notificacion));
  }

  public enviarNotificacion(data: FormData): Observable<Notificacion> {
    return this.requestConstructorService
      .request('POST', `${base_url}/notificacion`, data, {}, true, [
        Notificacion,
      ])
      .pipe(map((res: { notificacion: Notificacion }) => res.notificacion));
  }
}
