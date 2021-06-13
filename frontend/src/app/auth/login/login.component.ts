import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import swal from 'sweetalert2';

import {
  faUser,
  faLock,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public faUser: IconDefinition = faUser;
  public faLock: IconDefinition = faLock;

  public estaAutentificado: boolean = this.authService.estaAutentificado();

  public formEnviado = false;

  public loginForm = this.fb.group({
    usuario: ['', Validators.required],
    contraseña: ['', Validators.required],
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  public login(): void {
    this.formEnviado = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
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
