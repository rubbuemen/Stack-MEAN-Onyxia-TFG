import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [LoginComponent, RegistroComponent],
  exports: [LoginComponent, RegistroComponent],
  imports: [CommonModule, FontAwesomeModule],
})
export class AuthModule {}
