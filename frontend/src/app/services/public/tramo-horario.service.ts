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
        false,
        [DiaEvento],
        idDiaEvento
      )
      .pipe(
        map((res: { tramosHorarios: TramoHorario[] }) => res.tramosHorarios)
      );
  }
}
