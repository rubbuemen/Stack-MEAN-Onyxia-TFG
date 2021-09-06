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

  public getActividadesPublicasPorEvento(
    eventoId: ObjectId
  ): Observable<Actividad[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/actividad/listPub`,
        { eventoId },
        {},
        false,
        [Actividad]
      )
      .pipe(map((res: { actividades: Actividad[] }) => res.actividades));
  }

  public getActividadesPublicas(): Observable<Actividad[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/actividad/listPub`, {}, {}, false, [
        Actividad,
      ])
      .pipe(map((res: { actividades: Actividad[] }) => res.actividades));
  }

  public getActividad(id: ObjectId): Observable<Actividad> {
    return this.requestConstructorService
      .request('GET', `${base_url}/actividad`, { id }, {}, false, [Actividad])
      .pipe(map((res: { actividad: Actividad }) => res.actividad));
  }
}
