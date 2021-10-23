import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';

import { ObjectId } from 'mongoose';
import { AsistenciaMiembroReunion } from '../../models/asistencia-miembro-reunion';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AsistenciaMiembroReunionService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public marcarAsistencia(
    data: FormData,
    reunionId: ObjectId
  ): Observable<AsistenciaMiembroReunion> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/asistenciaMiembroReunion/asistencia`,
        data,
        {},
        true,
        [AsistenciaMiembroReunion],
        reunionId
      )
      .pipe(
        map((res: { asistencia: AsistenciaMiembroReunion }) => res.asistencia)
      );
  }

  public tieneAsistenciaMarcada(idReunion: ObjectId): Observable<boolean> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/asistenciaMiembroReunion/tieneAsistencia`,
        {},
        {},
        true,
        [AsistenciaMiembroReunion],
        idReunion
      )
      .pipe(
        map(
          (res: { tieneAsistenciaMarcada: boolean }) =>
            res.tieneAsistenciaMarcada
        )
      );
  }

  public getAsistencias(
    reunionId: ObjectId
  ): Observable<AsistenciaMiembroReunion[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/asistenciaMiembroReunion/asistencias`,
        {},
        {},
        true,
        [AsistenciaMiembroReunion],
        reunionId
      )
      .pipe(
        map(
          (res: { asistencias: AsistenciaMiembroReunion[] }) => res.asistencias
        )
      );
  }

  public verificarAsistencia(
    data: FormData,
    reunionId: ObjectId
  ): Observable<AsistenciaMiembroReunion[]> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/asistenciaMiembroReunion/verificar`,
        data,
        {},
        true,
        [AsistenciaMiembroReunion],
        reunionId
      )
      .pipe(
        map(
          (res: { asistenciasVerificadas: AsistenciaMiembroReunion[] }) =>
            res.asistenciasVerificadas
        )
      );
  }
}
