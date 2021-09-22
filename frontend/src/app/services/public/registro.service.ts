import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(
    private authService: AuthService,
    private requestConstructorService: RequestsConstructorService,
    private router: Router
  ) {}

  public registrarse(data: FormData): Observable<any> {
    return this.requestConstructorService
      .request('POST', `${base_url}/registrarse`, data, {}, false)
      .pipe(
        map((res: { jwtToken: string }) => {
          localStorage.setItem('jwtToken', res.jwtToken);
          this.authService.getUsuarioLogeado();
          this.authService.generarMenuSegunAuth(true);
          this.router.navigate(['/']);
          return res;
        })
      );
  }
}
