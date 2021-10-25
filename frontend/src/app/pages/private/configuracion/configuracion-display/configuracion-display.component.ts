import { Component, OnInit } from '@angular/core';
import { Configuracion } from '../../../../models/configuracion.model';
import { ConfiguracionService } from '../../../../services/private/configuracion.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion-display',
  templateUrl: './configuracion-display.component.html',
  styles: [],
})
export class ConfiguracionDisplayComponent implements OnInit {
  public configuracion: Configuracion;

  constructor(private configuracionService: ConfiguracionService) {}

  ngOnInit(): void {
    this.getConfiguracion();
  }

  private getConfiguracion(): void {
    this.configuracionService.getConfiguracion().subscribe((configuracion) => {
      this.configuracion = configuracion;
    });
  }

  public activarDesactivarModoMantenimiento(): void {
    this.configuracionService.getConfiguracion().subscribe((configuracion) => {
      const titleModoMantenimiento = configuracion.modoMantenimiento
        ? 'desactivar'
        : 'activar';
      const textoModoMantenimiento = configuracion.modoMantenimiento
        ? 'accesible'
        : 'inaccesible';
      swal
        .fire({
          title:
            '¿Estás seguro de ' +
            titleModoMantenimiento +
            ' el modo mantenimiento?',
          text:
            'La zona pública estará ' +
            textoModoMantenimiento +
            ' mientras esté en dicho estado',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, confirmar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            if (configuracion.modoMantenimiento) {
              this.configuracionService.desactivarModoMantenimiento().subscribe(
                () => {
                  swal
                    .fire(
                      'Modo mantenimiento desactivado',
                      'Se ha desactivado el modo mantenimiento correctamente',
                      'success'
                    )
                    .then(() => this.ngOnInit());
                },
                (error) => {
                  swal.fire('Error', error.error.error, 'error');
                }
              );
            } else {
              this.configuracionService.activarModoMantenimiento().subscribe(
                () => {
                  swal
                    .fire(
                      'Modo mantenimiento activado',
                      'Se ha activado el modo mantenimiento correctamente',
                      'success'
                    )
                    .then(() => this.ngOnInit());
                },
                (error) => {
                  swal.fire('Error', error.error.error, 'error');
                }
              );
            }
          }
        });
    });
  }

  public mostrarOcultarBanners(): void {
    this.configuracionService.getConfiguracion().subscribe((configuracion) => {
      const titleBanners = configuracion.ocultarBanners
        ? 'activar'
        : 'desactivar';
      const textoBanners = configuracion.ocultarBanners
        ? 'se mostrarán'
        : 'no se mostrarán';
      swal
        .fire({
          title:
            '¿Estás seguro de ' +
            titleBanners +
            ' mostrar los banners en la página principal?',
          text: 'Los banners en la página de inicio ' + textoBanners,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, confirmar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            if (configuracion.ocultarBanners) {
              this.configuracionService.mostrarBanners().subscribe(
                () => {
                  swal
                    .fire(
                      'Activado mostrar banners',
                      'Se ha activado mostrar banners correctamente',
                      'success'
                    )
                    .then(() => this.ngOnInit());
                },
                (error) => {
                  swal.fire('Error', error.error.error, 'error');
                }
              );
            } else {
              this.configuracionService.ocultarBanners().subscribe(
                () => {
                  swal
                    .fire(
                      'Desactivado mostrar banners',
                      'Se han ocultado los banners correctamente',
                      'success'
                    )
                    .then(() => this.ngOnInit());
                },
                (error) => {
                  swal.fire('Error', error.error.error, 'error');
                }
              );
            }
          }
        });
    });
  }
}
