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
        false,
        [DiaEvento],
        idEvento
      )
      .pipe(map((res: { diasEvento: DiaEvento[] }) => res.diasEvento));
  }
}
