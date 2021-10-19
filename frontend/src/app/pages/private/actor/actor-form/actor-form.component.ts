import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { ActorService } from '../../../../services/private/actor.service';
import { UtilsService } from '../../../../services/utils.service';
import { AuthService } from '../../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styles: [],
})
export class ActorFormComponent implements OnInit {
  public actor: any;
  public esVisitante: boolean = false;
  public formEnviado: boolean = false;
  public perfilActorForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private actorService: ActorService,
    private utils: UtilsService,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.perfilActorForm = this.generarPerfilActorForm();
    this.route.params.subscribe((params) => {
      this.getDatos(params['id']);
    });
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
        estaDeAlta: ['', Validators.required],
        cantidadPenalizaciones: ['', Validators.required],
        rol: ['', Validators.required],
        numeroSocio: ['', Validators.required],
        fotografia: [''],
        usuario: ['', Validators.required],
        contraseñaNueva: [''],
      });
    }
  }

  private getDatos(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.actorService.getDatos(this.idObject).subscribe((actor) => {
        this.esVisitante = actor.cuentaUsuario.autoridad === 'VISITANTE';
        if (this.esVisitante) {
          this.utils.eliminarElementoJquery('rowFotografia');
        }
        this.perfilActorForm = this.generarPerfilActorForm();
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
          this.utils.setValoresSelectPicker(
            'tieneCochePropio',
            this.actor.tieneCochePropio.toString()
          );
          this.perfilActorForm
            .get('estaDeAlta')
            .setValue(this.actor.estaDeAlta);
          this.utils.setValoresSelectPicker(
            'estaDeAlta',
            this.actor.estaDeAlta.toString()
          );
          this.perfilActorForm
            .get('cantidadPenalizaciones')
            .setValue(this.actor.cantidadPenalizaciones);
          this.perfilActorForm.get('rol').setValue(this.actor.rol);
          this.utils.setValoresSelectPicker('rol', this.actor.rol.toString());
          this.perfilActorForm
            .get('numeroSocio')
            .setValue(this.actor.numeroSocio);
          if (this.utils.existe(actor.fotografia)) {
            let imagen =
              'data:' +
              actor.fotografia.mimetype +
              ';base64,' +
              actor.fotografia.data;
            this.utils.setearImagenFileHtml(imagen);
          }
          this.utils.refrescarSelectPicker('tieneCochePropio');
          this.utils.refrescarSelectPicker('estaDeAlta');
          this.utils.refrescarSelectPicker('rol');
        }
      });
    }
  }

  public editarPerfil(): void {
    this.formEnviado = true;
    if (this.perfilActorForm.valid) {
      const data = this.utils.generarFormData(
        this.perfilActorForm,
        this.utils.obtenerPropiedadesFormGroup(this.perfilActorForm)
      );
      this.actorService.editarDatos(data, this.idObject).subscribe(
        (res) => {
          swal
            .fire(
              'Datos editados',
              'Se han editado los datos del usuario correctamente',
              'success'
            )
            .then(() =>
              this.router.navigate(['/private/actor/display', this.actor._id])
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
