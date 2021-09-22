import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import swal from 'sweetalert2';

import {
  faUser,
  faLock,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../auth.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public faUser: IconDefinition = faUser;
  public faLock: IconDefinition = faLock;

  public formEnviado = false;

  public loginForm = this.fb.group({
    usuario: ['', Validators.required],
    contraseña: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private utils: UtilsService
  ) {}

  public login(): void {
    this.formEnviado = true;
    if (this.loginForm.valid) {
      const data = this.utils.generarFormData(
        this.loginForm,
        this.utils.obtenerPropiedadesFormGroup(this.loginForm)
      );
      this.authService.login(data).subscribe(
        (res: any) => {},
        (error) => {
          swal.fire('Error', error.error.error, 'error');
        }
      );
    }
  }

  public validarCampo(campo: string): boolean {
    return this.loginForm.get(campo).invalid ? true : false;
  }
}
