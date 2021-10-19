import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { DiaEvento } from '../../models/dia-evento.model';
import { TramoHorario } from '../../models/tramo-horario.model';
import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class TramoHorarioService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getTramosHorarios(idDiaEvento: ObjectId): Observable<TramoHorario[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/tramoHorario/list`,
        {},
        {},
        true,
        [DiaEvento],
        idDiaEvento
      )
      .pipe(
        map((res: { tramosHorarios: TramoHorario[] }) => res.tramosHorarios)
      );
  }

  public getTramoHorario(id: ObjectId): Observable<TramoHorario> {
    return this.requestConstructorService
      .request('GET', `${base_url}/tramoHorario`, {}, {}, true, [DiaEvento], id)
      .pipe(map((res: { tramoHorario: TramoHorario }) => res.tramoHorario));
  }

  public editarTramoHorario(
    data: FormData,
    id: ObjectId
  ): Observable<TramoHorario> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/tramoHorario/edit`,
        data,
        {},
        true,
        [TramoHorario],
        id
      )
      .pipe(map((res: { tramoHorario: TramoHorario }) => res.tramoHorario));
  }

  public aniadirTramoHorario(
    data: FormData,
    idDia: ObjectId
  ): Observable<TramoHorario[]> {
    return this.requestConstructorService
      .request(
        'POST',
        `${base_url}/tramoHorario`,
        data,
        {},
        true,
        [TramoHorario],
        idDia
      )
      .pipe(map((res: { tramoHorario: TramoHorario }) => res.tramoHorario));
  }
  public eliminarTramoHorario(id: ObjectId): Observable<TramoHorario> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/tramoHorario/delete`,
        {},
        {},
        true,
        [TramoHorario],
        id
      )
      .pipe(map((res: { tramoHorario: TramoHorario }) => res.tramoHorario));
  }
}
