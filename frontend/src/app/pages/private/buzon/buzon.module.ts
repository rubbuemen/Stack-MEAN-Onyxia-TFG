import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { BuzonFormComponent } from './buzon-form/buzon-form.component';

@NgModule({
  declarations: [BuzonFormComponent],
  exports: [BuzonFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class BuzonModule {}
