import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { RegistroForm } from 'src/app/interfaces/registro-form';
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

  public registrarse(registroForm: RegistroForm): Observable<any> {
    const {
      nombre,
      apellidos,
      correoElectronico,
      fechaNacimiento,
      usuario,
      contraseña,
      numeroTelefono,
      alias,
      nombreRedSocial,
      enlaceRedSocial,
      usuarioRedSocial,
    } = registroForm;
    return this.requestConstructorService
      .request(
        'POST',
        `${base_url}/registrarse`,
        {
          nombre,
          apellidos,
          correoElectronico,
          fechaNacimiento,
          usuario,
          contraseña,
          numeroTelefono,
          alias,
          nombreRedSocial,
          enlaceRedSocial,
          usuarioRedSocial,
        },
        {},
        false
      )
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
