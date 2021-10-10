import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { ActorService } from '../../../../services/private/actor.service';
import { UtilsService } from '../../../../services/utils.service';
import { AuthService } from '../../../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongoose';

@Component({
  selector: 'app-convertir-miembro',
  templateUrl: './convertir-miembro.component.html',
  styles: [],
})
export class ConvertirMiembroComponent implements OnInit {
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
    this.utils.refrescarSelectPicker('tieneCochePropio');
    this.perfilActorForm = this.fb.group({
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
      contraseñaNueva: [''],
    });
    this.route.params.subscribe((params) => {
      this.getDatos(params['actorId']);
    });
  }

  private getDatos(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.actorService.getDatos(this.idObject).subscribe((actor) => {
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
        }
      });
    }
  }

  public convertirAMiembro(): void {
    this.formEnviado = true;
    if (this.perfilActorForm.valid) {
      const data = this.utils.generarFormData(
        this.perfilActorForm,
        this.utils.obtenerPropiedadesFormGroup(this.perfilActorForm)
      );
      if (this.perfilActorForm.get('fotografia').value) {
        this.actorService.hacerMiembro(data, this.idObject).subscribe(
          (res) => {
            swal
              .fire(
                'Convertido a miembro',
                'El visitante ha sido convertido a miembro',
                'success'
              )
              .then(() =>
                this.router.navigate(['/private/actor/list/visitante'])
              );
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
      } else {
        swal.fire('Error', 'Inserta una fotografía para el miembro', 'error');
      }
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
