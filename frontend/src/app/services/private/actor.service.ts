import { Output, EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Visitante } from '../../models/visitante.model';
import { Miembro } from '../../models/miembro.model';

import { ObjectId } from 'mongoose';

import { AuthService } from '../../auth/auth.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private tipoActor: Object;

  constructor(
    private requestConstructorService: RequestsConstructorService,
    private authService: AuthService
  ) {
    this.getTipoActorLogeado();
  }

  public getMisDatos(): Observable<any> {
    return this.requestConstructorService
      .request('GET', `${base_url}/actor/myData`, {}, {}, true, [
        typeof this.tipoActor,
      ])
      .pipe(map((res: { misDatos }) => res.misDatos));
  }

  public getDatos(actorId: ObjectId): Observable<any> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/actor`,
        {},
        {},
        true,
        [typeof this.tipoActor],
        actorId
      )
      .pipe(map((res: { datosActor }) => res.datosActor));
  }

  public editarMisDatos(data: FormData): Observable<any> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/actor/edit`,
        data,
        {},
        true,
        typeof this.tipoActor
      )
      .pipe(
        map((res: { jwtToken: string; actor: any }) => {
          localStorage.setItem('jwtToken', res.jwtToken);
          this.authService.getUsuarioLogeado();
          return res.actor;
        })
      );
  }

  public editarDatos(data: FormData, id: ObjectId): Observable<any> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/actor/edit`,
        data,
        {},
        true,
        typeof this.tipoActor,
        id
      )
      .pipe(map((res: { actor: any }) => res.actor));
  }

  public hacerMiembro(data: FormData, actorId: ObjectId): Observable<Miembro> {
    return this.requestConstructorService
      .request(
        'POST',
        `${base_url}/actor/hacerMiembro`,
        data,
        {},
        true,
        [Visitante],
        actorId
      )
      .pipe(map((res: { actor: Miembro }) => res.actor));
  }

  public getTipoActorLogeado() {
    if (this.authService.tieneRol('VISITANTE')) {
      this.tipoActor = Visitante;
    } else {
      this.tipoActor = Miembro;
    }
  }
}
