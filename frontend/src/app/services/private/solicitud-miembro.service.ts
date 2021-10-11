import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SolicitudMiembro } from '../../models/solicitud-miembro.model';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';

import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SolicitudMiembroService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getMiSolicitud(): Observable<SolicitudMiembro> {
    return this.requestConstructorService
      .request('GET', `${base_url}/solicitudMiembro`, {}, {}, true, [
        SolicitudMiembro,
      ])
      .pipe(
        map(
          (res: { solicitudMiembro: SolicitudMiembro }) => res.solicitudMiembro
        )
      );
  }

  public getSolicitudActor(actorId: ObjectId): Observable<SolicitudMiembro> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/solicitudMiembro`,
        {},
        {},
        true,
        [SolicitudMiembro],
        actorId
      )
      .pipe(
        map(
          (res: { solicitudMiembro: SolicitudMiembro }) => res.solicitudMiembro
        )
      );
  }

  public getSolicitudMiembro(id: ObjectId): Observable<SolicitudMiembro> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/solicitudMiembro/display`,
        {},
        {},
        true,
        [SolicitudMiembro],
        id
      )
      .pipe(
        map(
          (res: { solicitudMiembro: SolicitudMiembro }) => res.solicitudMiembro
        )
      );
  }

  public realizarPago(
    data: FormData,
    id: ObjectId
  ): Observable<SolicitudMiembro> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/solicitudMiembro/pagoAutomatico`,
        data,
        {},
        true,
        [SolicitudMiembro],
        id
      )
      .pipe(
        map(
          (res: { solicitudMiembro: SolicitudMiembro }) => res.solicitudMiembro
        )
      );
  }

  public aceptarSolicitud(id: ObjectId): Observable<SolicitudMiembro> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/solicitudMiembro/aceptar`,
        {},
        {},
        true,
        [SolicitudMiembro],
        id
      )
      .pipe(
        map(
          (res: { solicitudMiembro: SolicitudMiembro }) => res.solicitudMiembro
        )
      );
  }

  public rechazarSolicitud(id: ObjectId): Observable<SolicitudMiembro> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/solicitudMiembro/rechazar`,
        {},
        {},
        true,
        [SolicitudMiembro],
        id
      )
      .pipe(
        map(
          (res: { solicitudMiembro: SolicitudMiembro }) => res.solicitudMiembro
        )
      );
  }

  public establecerPagado(id: ObjectId): Observable<SolicitudMiembro> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/solicitudMiembro/establecerPagado`,
        {},
        {},
        true,
        [SolicitudMiembro],
        id
      )
      .pipe(
        map(
          (res: { solicitudMiembro: SolicitudMiembro }) => res.solicitudMiembro
        )
      );
  }

  public getSolicitudesPendientes(): Observable<SolicitudMiembro[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/solicitudMiembro/listPendientes`,
        {},
        {},
        true,
        [SolicitudMiembro]
      )
      .pipe(
        map(
          (res: { solicitudesMiembros: SolicitudMiembro[] }) =>
            res.solicitudesMiembros
        )
      );
  }

  public getSolicitudesRechazadas(): Observable<SolicitudMiembro[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/solicitudMiembro/listRechazadas`,
        {},
        {},
        true,
        [SolicitudMiembro]
      )
      .pipe(
        map(
          (res: { solicitudesMiembros: SolicitudMiembro[] }) =>
            res.solicitudesMiembros
        )
      );
  }

  public getSolicitudesAceptadas(): Observable<SolicitudMiembro[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/solicitudMiembro/listAceptadas`,
        {},
        {},
        true,
        [SolicitudMiembro]
      )
      .pipe(
        map(
          (res: { solicitudesMiembros: SolicitudMiembro[] }) =>
            res.solicitudesMiembros
        )
      );
  }

  public getSolicitudesPendientesPago(): Observable<SolicitudMiembro[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/solicitudMiembro/listPendientePago`,
        {},
        {},
        true,
        [SolicitudMiembro]
      )
      .pipe(
        map(
          (res: { solicitudesMiembros: SolicitudMiembro[] }) =>
            res.solicitudesMiembros
        )
      );
  }

  public getSolicitudesPagadas(): Observable<SolicitudMiembro[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/solicitudMiembro/listPagadas`,
        {},
        {},
        true,
        [SolicitudMiembro]
      )
      .pipe(
        map(
          (res: { solicitudesMiembros: SolicitudMiembro[] }) =>
            res.solicitudesMiembros
        )
      );
  }
}
