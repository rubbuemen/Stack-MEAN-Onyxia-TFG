import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { CuentaUsuario } from '../../models/cuenta-usuario.model';
import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CuentaUsuarioService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public banearUsuario(id: ObjectId): Observable<CuentaUsuario> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/ban`, {}, {}, true, [CuentaUsuario], id)
      .pipe(map((res: { cuentaUsuario: CuentaUsuario }) => res.cuentaUsuario));
  }

  public desbanearUsuario(id: ObjectId): Observable<CuentaUsuario> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/unban`, {}, {}, true, [CuentaUsuario], id)
      .pipe(map((res: { cuentaUsuario: CuentaUsuario }) => res.cuentaUsuario));
  }
}
