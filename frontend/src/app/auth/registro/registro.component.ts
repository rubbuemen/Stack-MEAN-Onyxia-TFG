import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import swal from 'sweetalert2';
import { RegistroService } from '../../services/public/registro.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  public formEnviado = false;

  public registroForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    correoElectronico: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', Validators.required],
    usuario: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(32)],
    ],
    contraseña: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(32)],
    ],
    alias: [],
    numeroTelefono: [],
    nombreRedSocial: [],
    enlaceRedSocial: [],
    usuarioRedSocial: [],
  });

  constructor(
    private registroService: RegistroService,
    private fb: FormBuilder,
    private utils: UtilsService
  ) {}

  public registrarse(): void {
    this.formEnviado = true;
    if (this.registroForm.valid) {
      const data = this.utils.generarFormData(
        this.registroForm,
        this.utils.obtenerPropiedadesFormGroup(this.registroForm)
      );
      this.registroService.registrarse(data).subscribe(
        (res: any) => {
          swal.fire('Registro', 'Registro completado con éxito', 'success');
        },
        (error) => {
          swal.fire('Error', error.error.error, 'error');
        }
      );
    }
  }

  public validarCampo(campo: string): boolean {
    return this.registroForm.get(campo).invalid ? true : false;
  }
}
