import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Evento } from '../../models/evento.model';
import { DiaEvento } from '../../models/dia-evento.model';
import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DiaEventoService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getDiasEvento(idEvento: ObjectId): Observable<DiaEvento[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/diaEvento/list`,
        {},
        {},
        true,
        [DiaEvento],
        idEvento
      )
      .pipe(map((res: { diasEvento: DiaEvento[] }) => res.diasEvento));
  }

  public getDiaEvento(id: ObjectId): Observable<DiaEvento> {
    return this.requestConstructorService
      .request('GET', `${base_url}/diaEvento`, {}, {}, true, [DiaEvento], id)
      .pipe(map((res: { diaEvento: DiaEvento }) => res.diaEvento));
  }

  public getDiaEventoPorTramoHorario(
    tramoHorarioId: ObjectId
  ): Observable<DiaEvento> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/diaEvento/tramoHorario`,
        {},
        {},
        true,
        [DiaEvento],
        tramoHorarioId
      )
      .pipe(map((res: { diaEvento: DiaEvento }) => res.diaEvento));
  }

  public eliminarUltimoDia(idEvento: ObjectId): Observable<DiaEvento> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/diaEvento`,
        {},
        {},
        true,
        [DiaEvento],
        idEvento
      )
      .pipe(map((res: { dia: DiaEvento }) => res.dia));
  }

  public aniadirDia(idEvento: ObjectId): Observable<DiaEvento> {
    return this.requestConstructorService
      .request(
        'POST',
        `${base_url}/diaEvento`,
        {},
        {},
        true,
        [DiaEvento],
        idEvento
      )
      .pipe(map((res: { dia: DiaEvento }) => res.dia));
  }
}
