import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { ActividadMiembroTramo } from '../../models/actividad-miembro-tramo.model';

import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ActividadMiembroTramoService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getHorarios(eventoId: ObjectId): Observable<ActividadMiembroTramo[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/actividadMiembroTramo/list`,
        {},
        {},
        true,
        [ActividadMiembroTramo],
        eventoId
      )
      .pipe(map((res: { horarios: ActividadMiembroTramo[] }) => res.horarios));
  }

  public crearHorario(
    data: FormData,
    eventoId: ObjectId
  ): Observable<ActividadMiembroTramo> {
    return this.requestConstructorService
      .request(
        'POST',
        `${base_url}/actividadMiembroTramo`,
        data,
        {},
        true,
        [ActividadMiembroTramo],
        eventoId
      )
      .pipe(map((res: { horario: ActividadMiembroTramo }) => res.horario));
  }

  public eliminarHorario(id: ObjectId): Observable<ActividadMiembroTramo> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/actividadMiembroTramo/delete`,
        {},
        {},
        true,
        [ActividadMiembroTramo],
        id
      )
      .pipe(map((res: { horario: ActividadMiembroTramo }) => res.horario));
  }
}
