import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongoose';
import { RedSocial } from '../../../../models/red-social.model';
import { RedSocialService } from '../../../../services/private/red-social.service';
import { UtilsService } from '../../../../services/utils.service';
import swal from 'sweetalert2';
import { ActorService } from '../../../../services/private/actor.service';
import { SharedDataService } from '../../../../services/shared-data.service';

@Component({
  selector: 'app-red-social-form',
  templateUrl: './red-social-form.component.html',
  styles: [],
})
export class RedSocialFormComponent implements OnInit {
  public actor: any;
  public redSocial: RedSocial;
  public edicion: boolean = true;
  public formEnviado: boolean = false;
  public redSocialForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private redSocialService: RedSocialService,
    private sharedDataService: SharedDataService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.redSocialForm = this.fb.group({
      nombre: ['', Validators.required],
      enlace: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.route.params.subscribe((params) => {
      this.getRedSocial(params['id']);
    });
    this.sharedDataService.currentActor.subscribe(
      (actor) => (this.actor = actor)
    );
  }

  private getRedSocial(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.redSocialService.getRedSocial(this.idObject).subscribe(
        (redSocial) => {
          this.redSocial = redSocial;
          this.redSocialForm.get('nombre').setValue(this.redSocial.nombre);
          this.redSocialForm.get('enlace').setValue(this.redSocial.enlace);
          this.redSocialForm.get('usuario').setValue(this.redSocial.usuario);
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.redSocialForm.valid) {
      const data = this.utils.generarFormData(
        this.redSocialForm,
        this.utils.obtenerPropiedadesFormGroup(this.redSocialForm)
      );
      this.redSocialService.editarRedSocial(data, this.idObject).subscribe(
        () => {
          swal
            .fire(
              'Datos editados',
              'Se ha editado la red social correctamente',
              'success'
            )
            .then(() =>
              this.router.navigate(['/private/red-social/list', this.actor._id])
            );
        },
        (error) => {
          swal.fire('Error', error.error.error, 'error');
        }
      );
    }
  }

  public validarCampo(campo: string): boolean {
    return this.redSocialForm.get(campo).invalid ? true : false;
  }
}
