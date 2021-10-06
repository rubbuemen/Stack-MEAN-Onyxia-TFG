import { Component, OnInit } from '@angular/core';

import { Notificacion } from '../../../../models/notificacion.model';
import { Miembro } from '../../../../models/miembro.model';
import { Visitante } from '../../../../models/visitante.model';

import { NotificacionService } from '../../../../services/private/notificacion.service';
import { AuthService } from '../../../../auth/auth.service';
import { MiembroService } from '../../../../services/private/miembro.service';

import { UtilsService } from '../../../../services/utils.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert2';
import { VisitanteService } from '../../../../services/private/visitante.service';
import { ActorService } from '../../../../services/private/actor.service';

@Component({
  selector: 'app-notificacion-form',
  templateUrl: './notificacion-form.component.html',
})
export class NotificacionFormComponent implements OnInit {
  public notificacion: Notificacion;
  public esVisitante: boolean = false;
  public esPresidente: boolean = false;
  public presidente: Miembro;
  private actorActual: any = this.getMisDatos();
  public receptores: any[] = [];
  public formEnviado: boolean = false;
  public notificacionForm: FormGroup;

  constructor(
    private notificacionService: NotificacionService,
    private miembroService: MiembroService,
    private visitanteService: VisitanteService,
    private actorService: ActorService,
    private utils: UtilsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.notificacionForm = this.fb.group({
      asunto: ['', Validators.required],
      cuerpo: ['', Validators.required],
      receptores: ['', Validators.required],
    });
    this.esVisitante = this.authService.tieneRol('VISITANTE');
    this.esPresidente = this.authService.tieneRol('PRESIDENTE');
    if (this.esVisitante) {
      this.getPresidente();
    } else {
      this.getReceptores();
      this.utils.refrescarSelectPicker('receptores');
    }
  }

  private getMisDatos(): void {
    this.actorService.getMisDatos().subscribe((actor) => {
      this.actorActual = actor;
    });
  }

  private getPresidente(): void {
    this.miembroService.getPresidente().subscribe((miembro) => {
      this.presidente = miembro;
      this.notificacionForm.get('receptores').setValue([this.presidente._id]);
    });
  }

  private getReceptores(): void {
    this.miembroService.getMiembrosVigentes().subscribe((miembros) => {
      if (this.esPresidente) {
        this.visitanteService.getVisitantes().subscribe((visitantes) => {
          this.receptores = miembros.concat(<any>visitantes);
          this.eliminarActorLogeado();
        });
      } else {
        this.receptores = miembros;
        this.eliminarActorLogeado();
      }
    });
  }

  private eliminarActorLogeado() {
    this.receptores.forEach((receptor, index) => {
      if (receptor._id === this.actorActual._id)
        this.receptores.splice(index, 1);
    });
  }

  public enviarNotificacion(): void {
    this.formEnviado = true;
    if (this.notificacionForm.valid) {
      const propiedadesArrays = ['receptores'];
      const data = this.utils.generarFormData(
        this.notificacionForm,
        this.utils.obtenerPropiedadesFormGroup(this.notificacionForm),
        propiedadesArrays
      );
      this.notificacionService.enviarNotificacion(data).subscribe(
        () => {
          swal
            .fire(
              'Notificación enviada',
              'La notificación ha sido enviada correctamente',
              'success'
            )
            .then(() => this.router.navigate(['/private/notificacion']));
        },
        (error) => {
          swal.fire('Error', error.error.error, 'error');
        }
      );
    }
  }

  public validarCampo(campo: string): boolean {
    return this.notificacionForm.get(campo).invalid ? true : false;
  }
}
