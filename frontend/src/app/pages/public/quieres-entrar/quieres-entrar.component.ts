import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { Miembro } from '../../../models/miembro.model';
import { MiembroService } from '../../../services/public/miembro.service';
import { SolicitudMiembroService } from '../../../services/public/solicitud-miembro.service';

declare const jQuery: any;

@Component({
  selector: 'app-quieres-entrar',
  templateUrl: './quieres-entrar.component.html',
  styleUrls: ['./quieres-entrar.component.css'],
})
export class QuieresEntrarComponent {
  public miembros: Miembro[] = [];
  public formEnviado = false;

  public solicitudMiembroForm = this.fb.group({
    comoHaConocidoAsociacion: ['', Validators.required],
    intereses: ['', Validators.required],
    habilidades: ['', Validators.required],
    ideas: ['', Validators.required],
    tieneCochePropio: ['', Validators.required],
    miembrosConocidos: [''],
  });

  constructor(
    private miembroService: MiembroService,
    private solicitudMiembroService: SolicitudMiembroService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMiembrosVigentes();
    setTimeout(() => {
      (function ($) {
        $('#miembrosConocidos').selectpicker('refresh');
      })(jQuery);
    }, 500);
  }

  private getMiembrosVigentes(): void {
    this.miembroService.getMiembrosVigentes().subscribe((miembros) => {
      this.miembros = miembros;
    });
  }

  public enviarSolicitudMiembro(): void {
    this.formEnviado = true;
    if (this.solicitudMiembroForm.valid) {
      this.solicitudMiembroService
        .crearSolicitudMiembro(this.solicitudMiembroForm.value)
        .subscribe(
          (res) => {
            swal.fire(
              'Solicitud enviada',
              'Espera a que se revise la solicitud',
              'success'
            );
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
    }
  }

  public validarCampo(campo: string): boolean {
    return this.solicitudMiembroForm.get(campo).invalid ? true : false;
  }
}
