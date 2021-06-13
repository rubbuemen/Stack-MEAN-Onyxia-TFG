import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';

import { SolicitudMiembroForm } from '../../interfaces/solicitud-miembro-form.interface';
import { SolicitudMiembro } from '../../models/solicitud-miembro.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SolicitudMiembroService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public crearSolicitudMiembro(
    solicitudMiembroData: SolicitudMiembroForm
  ): Observable<SolicitudMiembro> {
    return this.requestConstructorService
      .request(
        'POST',
        `${base_url}/solicitudMiembro`,
        { solicitudMiembroData },
        {},
        true,
        SolicitudMiembro
      )
      .pipe(
        map(
          (res: { solicitudMiembro: SolicitudMiembro }) => res.solicitudMiembro
        )
      );
  }
}
