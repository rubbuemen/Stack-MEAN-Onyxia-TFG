import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Buzon } from '../../models/buzon.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BuzonService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getBuzones(): Observable<Buzon[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/buzon/list`, {}, {}, true, [Buzon])
      .pipe(map((res: { buzones: Buzon[] }) => res.buzones));
  }

  public getBuzonEntrada(): Observable<Buzon> {
    return this.requestConstructorService
      .request('GET', `${base_url}/buzon/entrada`, {}, {}, true, [Buzon])
      .pipe(map((res: { buzon: Buzon }) => res.buzon));
  }
}
