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

  public getEventos(): Observable<Evento[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/evento/list`, {}, {}, true, [Evento])
      .pipe(map((res: { eventos: Evento[] }) => res.eventos));
  }

  public getEventosPublicos(): Observable<Evento[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/evento/listPub`, {}, {}, true, [Evento])
      .pipe(map((res: { eventos: Evento[] }) => res.eventos));
  }

  public getEvento(id: ObjectId): Observable<Evento> {
    return this.requestConstructorService
      .request('GET', `${base_url}/evento`, {}, {}, true, [Evento], id)
      .pipe(map((res: { evento: Evento }) => res.evento));
  }

  public editarEvento(data: FormData, id: ObjectId): Observable<Evento> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/evento/edit`, data, {}, true, [Evento], id)
      .pipe(map((res: { evento: Evento }) => res.evento));
  }

  public crearEvento(data: FormData): Observable<Evento> {
    return this.requestConstructorService
      .request('POST', `${base_url}/evento`, data, {}, true, [Evento])
      .pipe(map((res: { evento: Evento }) => res.evento));
  }

  public eliminarEvento(id: ObjectId): Observable<Evento> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/evento/delete`,
        {},
        {},
        true,
        [Evento],
        id
      )
      .pipe(map((res: { evento: Evento }) => res.evento));
  }

  public cancelarEvento(id: ObjectId): Observable<Evento> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/evento/cancelar`, {}, {}, true, [Evento], id)
      .pipe(map((res: { evento: Evento }) => res.evento));
  }

  public publicarEvento(id: ObjectId): Observable<Evento> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/evento/publicar`, {}, {}, true, [Evento], id)
      .pipe(map((res: { evento: Evento }) => res.evento));
  }

  public ocultarEvento(id: ObjectId): Observable<Evento> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/evento/ocultar`, {}, {}, true, [Evento], id)
      .pipe(map((res: { evento: Evento }) => res.evento));
  }
}
