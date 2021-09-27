import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { ActorService } from '../../../../services/private/actor.service';
import { UtilsService } from '../../../../services/utils.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-actor-self-form',
  templateUrl: './actor-self-form.component.html',
  styles: [],
})
export class ActorSelfFormComponent implements OnInit {
  public actor: any;
  public esVisitante: boolean = false;
  public formEnviado: boolean = false;
  public perfilActorForm: FormGroup;

  constructor(
    private actorService: ActorService,
    private utils: UtilsService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.utils.refrescarSelectPicker('tieneCochePropio');
    this.esVisitante = this.authService.tieneRol('VISITANTE');
    this.perfilActorForm = this.generarPerfilActorForm();
    this.getMisDatos();
    if (this.esVisitante) {
      this.utils.eliminarElementoJquery('rowFotografia');
    }
  }

  private generarPerfilActorForm(): FormGroup {
    if (this.esVisitante) {
      return this.fb.group({
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        correoElectronico: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        alias: [''],
        numeroTelefono: [''],
        usuario: ['', Validators.required],
        contraseñaActual: [''],
        contraseñaNueva: [''],
      });
    } else {
      return this.fb.group({
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        correoElectronico: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        alias: ['', Validators.required],
        numeroTelefono: ['', Validators.required],
        direccion: ['', Validators.required],
        dni: ['', Validators.required],
        aficiones: ['', Validators.required],
        tieneCochePropio: ['', Validators.required],
        fotografia: [''],
        usuario: ['', Validators.required],
        contraseñaActual: [''],
        contraseñaNueva: [''],
      });
    }
  }

  private getMisDatos(): void {
    this.actorService.getMisDatos().subscribe((actor) => {
      if (!this.utils.existe(actor.alias)) actor.alias = '';
      if (!this.utils.existe(actor.numeroTelefono)) actor.numeroTelefono = '';
      this.actor = actor;
      this.perfilActorForm.get('nombre').setValue(this.actor.nombre);
      this.perfilActorForm.get('apellidos').setValue(this.actor.apellidos);
      this.perfilActorForm
        .get('correoElectronico')
        .setValue(this.actor.correoElectronico);
      this.perfilActorForm
        .get('fechaNacimiento')
        .setValue(formatDate(this.actor.fechaNacimiento, 'yyyy-MM-dd', 'en'));
      this.perfilActorForm.get('alias').setValue(this.actor.alias);
      this.perfilActorForm
        .get('numeroTelefono')
        .setValue(this.actor.numeroTelefono);
      this.perfilActorForm
        .get('usuario')
        .setValue(this.actor.cuentaUsuario.usuario);
      if (!this.esVisitante) {
        this.perfilActorForm.get('direccion').setValue(this.actor.direccion);
        this.perfilActorForm.get('dni').setValue(this.actor.dni);
        this.perfilActorForm.get('aficiones').setValue(this.actor.aficiones);
        this.perfilActorForm
          .get('tieneCochePropio')
          .setValue(this.actor.tieneCochePropio);
        if (this.utils.existe(actor.fotografia)) {
          let imagen =
            'data:' +
            actor.fotografia.mimetype +
            ';base64,' +
            actor.fotografia.data;
          this.utils.setearImagenFileHtml(imagen);
        }
      }
    });
  }

  public editarPerfil(): void {
    this.formEnviado = true;
    if (this.perfilActorForm.valid) {
      const data = this.utils.generarFormData(
        this.perfilActorForm,
        this.utils.obtenerPropiedadesFormGroup(this.perfilActorForm)
      );
      this.actorService.editarMisDatos(data).subscribe(
        (res) => {
          swal.fire(
            'Datos editados',
            'Se han editado tus datos correctamente',
            'success'
          );
        },
        (error) => {
          swal.fire('Error', error.error.error, 'error');
        }
      );
    }
  }

  onFileChange(event) {
    if (event.target['files'].length > 0) {
      const file = event.target['files'][0];
      this.perfilActorForm.get('fotografia').setValue(file);
      this.perfilActorForm.get('fotografia').updateValueAndValidity();
    }
  }

  public validarCampo(campo: string): boolean {
    return this.perfilActorForm.get(campo).invalid ? true : false;
  }
}
