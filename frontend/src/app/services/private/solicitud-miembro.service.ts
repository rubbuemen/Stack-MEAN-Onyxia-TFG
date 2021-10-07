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
      .request('GET', `${base_url}/solicitudMiembro/estado`, {}, {}, true, [
        SolicitudMiembro,
      ])
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
}
