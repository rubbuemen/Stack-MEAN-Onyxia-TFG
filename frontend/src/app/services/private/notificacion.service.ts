import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Notificacion } from '../../models/Notificacion.model';

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
        map((res: { notificaciones: Notificacion[] }) => res.notificaciones)
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
        map((res: { notificaciones: Notificacion[] }) => res.notificaciones)
      );
  }
}
