import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-inicio-public',
  templateUrl: './inicio.component.html',
})
export class InicioPublicComponent {
  public esVisitante: Boolean;
  public estaAutenticado: Boolean;

  constructor(private authService: AuthService) {
    this.authService.autentificado.subscribe(
      (autentificado) => (this.estaAutenticado = autentificado)
    );
    this.authService.esVisitante.subscribe(
      (esVisitante) => (this.esVisitante = esVisitante)
    );
    this.estaAutenticado = this.authService.estaAutentificado();
    this.esVisitante = this.authService.tieneRol('VISITANTE');
  }
}
