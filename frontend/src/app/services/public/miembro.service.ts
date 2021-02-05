import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Miembro } from '../../models/miembro.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MiembroService {
  constructor(private requestConstructorService: RequestsConstructorService) { }

  public getJuntaSuperior(): Observable<Miembro[]> {
    return this.requestConstructorService.request('GET', `${base_url}/miembro/juntaSuperior`, {}, {}, false, [Miembro])
      .pipe(map((res: { miembros: Miembro[] }) =>
        res.miembros
      ));
  }

  public getJuntaVocales(): Observable<Miembro[]> {
    return this.requestConstructorService.request('GET', `${base_url}/miembro/juntaVocales`, {}, {}, false, [Miembro])
      .pipe(map((res: { miembros: Miembro[] }) =>
        res.miembros
      ));
  }

}