import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Visitante } from '../../models/visitante.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class VisitanteService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getVisitantes(): Observable<Visitante[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/actor/visitantes`, {}, {}, true, [Visitante])
      .pipe(map((res: { visitantes: Visitante[] }) => res.visitantes));
  }
}
