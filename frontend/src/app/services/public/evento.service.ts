import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Evento } from '../../models/evento.model';
import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getEventosPublicos(): Observable<Evento[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/evento/listPub`, {}, {}, false, [Evento])
      .pipe(map((res: { eventos: Evento[] }) => res.eventos));
  }

  public getEvento(id: ObjectId): Observable<Evento> {
    return this.requestConstructorService
      .request('GET', `${base_url}/evento`, {}, {}, false, [Evento], id)
      .pipe(map((res: { evento: Evento }) => res.evento));
  }
}
