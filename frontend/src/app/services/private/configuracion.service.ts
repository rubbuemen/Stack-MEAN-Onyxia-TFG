import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Configuracion } from '../../models/configuracion.model';
import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getConfiguracion(): Observable<Configuracion> {
    return this.requestConstructorService
      .request('GET', `${base_url}/configuracion/show`, {}, {}, true, [
        Configuracion,
      ])
      .pipe(map((res: { configuracion: Configuracion }) => res.configuracion));
  }

  public activarModoMantenimiento(): Observable<Configuracion> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/configuracion/modoMantenimientoOn`,
        {},
        {},
        true,
        [Configuracion]
      )
      .pipe(map((res: { configuracion: Configuracion }) => res.configuracion));
  }

  public desactivarModoMantenimiento(): Observable<Configuracion> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/configuracion/modoMantenimientoOff`,
        {},
        {},
        true,
        [Configuracion]
      )
      .pipe(map((res: { configuracion: Configuracion }) => res.configuracion));
  }

  public mostrarBanners(): Observable<Configuracion> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/configuracion/mostrarBanners`,
        {},
        {},
        true,
        [Configuracion]
      )
      .pipe(map((res: { configuracion: Configuracion }) => res.configuracion));
  }

  public ocultarBanners(): Observable<Configuracion> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/configuracion/ocultarBanners`,
        {},
        {},
        true,
        [Configuracion]
      )
      .pipe(map((res: { configuracion: Configuracion }) => res.configuracion));
  }
}
