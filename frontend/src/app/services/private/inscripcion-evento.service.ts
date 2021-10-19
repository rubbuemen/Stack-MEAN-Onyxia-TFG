import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { InscripcionEvento } from '../../models/inscripcion-evento.model';
import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class InscripcionEventoService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getInscripcionesByEvento(
    idEvento: ObjectId
  ): Observable<InscripcionEvento[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/inscripcionEvento/list`,
        {},
        {},
        true,
        [InscripcionEvento],
        idEvento
      )
      .pipe(
        map(
          (res: { inscripcionesEvento: InscripcionEvento[] }) =>
            res.inscripcionesEvento
        )
      );
  }

  public getInscripcionesPendientesByEvento(
    idEvento: ObjectId
  ): Observable<InscripcionEvento[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/inscripcionEvento/pendientes`,
        {},
        {},
        true,
        [InscripcionEvento],
        idEvento
      )
      .pipe(
        map(
          (res: { inscripcionesEvento: InscripcionEvento[] }) =>
            res.inscripcionesEvento
        )
      );
  }

  public getInscripcionesAceptadasByEvento(
    idEvento: ObjectId
  ): Observable<InscripcionEvento[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/inscripcionEvento/aceptadas`,
        {},
        {},
        true,
        [InscripcionEvento],
        idEvento
      )
      .pipe(
        map(
          (res: { inscripcionesEvento: InscripcionEvento[] }) =>
            res.inscripcionesEvento
        )
      );
  }

  public getMisInscripciones(): Observable<InscripcionEvento[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/inscripcionEvento/mylist`, {}, {}, true, [
        InscripcionEvento,
      ])
      .pipe(
        map(
          (res: { inscripcionesEvento: InscripcionEvento[] }) =>
            res.inscripcionesEvento
        )
      );
  }

  public inscribirseAEvento(
    data: FormData,
    idEvento: ObjectId
  ): Observable<InscripcionEvento> {
    return this.requestConstructorService
      .request(
        'POST',
        `${base_url}/inscripcionEvento`,
        data,
        {},
        true,
        [InscripcionEvento],
        idEvento
      )
      .pipe(
        map(
          (res: { inscripcionEvento: InscripcionEvento }) =>
            res.inscripcionEvento
        )
      );
  }

  public aceptarInscripcionEvento(id: ObjectId): Observable<InscripcionEvento> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/inscripcionEvento`,
        {},
        {},
        true,
        [InscripcionEvento],
        id
      )
      .pipe(
        map(
          (res: { inscripcionEvento: InscripcionEvento }) =>
            res.inscripcionEvento
        )
      );
  }

  public tieneInscripcion(idEvento: ObjectId): Observable<boolean> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/inscripcionEvento/checkInscripcion`,
        {},
        {},
        true,
        [InscripcionEvento],
        idEvento
      )
      .pipe(map((res: { tieneInscripcion: boolean }) => res.tieneInscripcion));
  }

  public getEstadoInscripcionByEvento(
    idEvento: ObjectId
  ): Observable<InscripcionEvento> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/inscripcionEvento`,
        {},
        {},
        true,
        [InscripcionEvento],
        idEvento
      )
      .pipe(
        map(
          (res: { inscripcionEvento: InscripcionEvento }) =>
            res.inscripcionEvento
        )
      );
  }
}
