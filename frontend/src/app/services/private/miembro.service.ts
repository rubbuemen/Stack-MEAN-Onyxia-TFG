import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Miembro } from '../../models/miembro.model';
import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MiembroService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getPresidente(): Observable<Miembro> {
    return this.requestConstructorService
      .request('GET', `${base_url}/miembro/presidente`, {}, {}, true, [Miembro])
      .pipe(map((res: { miembro: Miembro }) => res.miembro));
  }

  public getMiembrosVigentes(): Observable<Miembro[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/miembro/list`, {}, {}, false, [Miembro])
      .pipe(map((res: { miembros: Miembro[] }) => res.miembros));
  }

  public getMiembros(): Observable<Miembro[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/actor/miembros`, {}, {}, true, [Miembro])
      .pipe(
        map((res: { miembros }) =>
          res.miembros.sort((a, b) => {
            return a.numeroSocio > b.numeroSocio ? -1 : 1;
          })
        )
      );
  }

  public getMiembro(id: ObjectId): Observable<Miembro> {
    return this.requestConstructorService
      .request('GET', `${base_url}/actor`, {}, {}, true, [Miembro], id)
      .pipe(map((res: { datosActor: Miembro }) => res.datosActor));
  }

  public getMiembrosParaHorario(eventoId: ObjectId): Observable<Miembro[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/miembro/eventoAceptados`,
        {},
        {},
        true,
        [Miembro],
        eventoId
      )
      .pipe(map((res: { miembros: Miembro[] }) => res.miembros));
  }

  public penalizarMiembro(id: ObjectId): Observable<Miembro> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/miembro/penalizar`,
        {},
        {},
        true,
        [Miembro],
        id
      )
      .pipe(map((res: { miembro }) => res.miembro));
  }

  public darBaja(id: ObjectId): Observable<Miembro> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/miembro/darBaja`,
        {},
        {},
        true,
        [Miembro],
        id
      )
      .pipe(map((res: { miembro }) => res.miembro));
  }

  public darAlta(id: ObjectId): Observable<Miembro> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/miembro/darAltaExMiembro`,
        {},
        {},
        true,
        [Miembro],
        id
      )
      .pipe(map((res: { miembro }) => res.miembro));
  }
}
