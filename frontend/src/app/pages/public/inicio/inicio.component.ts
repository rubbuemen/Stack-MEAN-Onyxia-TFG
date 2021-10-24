import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ConfiguracionService } from '../../../services/public/configuracion.service';

@Component({
  selector: 'app-inicio-public',
  templateUrl: './inicio.component.html',
})
export class InicioPublicComponent {
  public esVisitante: Boolean;
  public estaAutenticado: Boolean;
  public ocultarBanners: boolean = false;

  constructor(
    private authService: AuthService,
    private configuracionService: ConfiguracionService
  ) {
    this.getConfiguracion();
    this.authService.autentificado.subscribe(
      (autentificado) => (this.estaAutenticado = autentificado)
    );
    this.authService.esVisitante.subscribe(
      (esVisitante) => (this.esVisitante = esVisitante)
    );
    this.estaAutenticado = this.authService.estaAutentificado();
    this.esVisitante = this.authService.tieneRol('VISITANTE');
  }

  private getConfiguracion(): void {
    this.configuracionService.getConfiguracion().subscribe((configuracion) => {
      this.ocultarBanners = configuracion.ocultarBanners;
    });
  }
}
