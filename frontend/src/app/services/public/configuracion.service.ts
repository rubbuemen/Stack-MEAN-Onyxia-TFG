import { Injectable, EventEmitter, Output } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Configuracion } from '../../models/configuracion.model';

import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  @Output() public esLogin: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private requestConstructorService: RequestsConstructorService,
    private router: Router
  ) {}

  public setearLogin(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.routeConfig)
      )
      .subscribe((data) => {
        if (data && data.path === 'login') {
          this.esLogin.emit(true);
        } else {
          this.esLogin.emit(false);
        }
      });
  }

  public getConfiguracion(): Observable<Configuracion> {
    return this.requestConstructorService
      .request('GET', `${base_url}/configuracion/show`, {}, {}, false, [
        Configuracion,
      ])
      .pipe(map((res: { configuracion: Configuracion }) => res.configuracion));
  }
}
