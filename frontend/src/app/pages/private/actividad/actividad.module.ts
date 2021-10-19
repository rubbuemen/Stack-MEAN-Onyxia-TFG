import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { ActividadListComponent } from './actividad-list/actividad-list.component';
import { ActividadFormComponent } from './actividad-form/actividad-form.component';
import { ActividadDisplayComponent } from './actividad-display/actividad-display.component';

@NgModule({
  declarations: [
    ActividadListComponent,
    ActividadFormComponent,
    ActividadDisplayComponent,
  ],
  exports: [
    ActividadListComponent,
    ActividadFormComponent,
    ActividadDisplayComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DataTablesModule,
  ],
})
export class ActividadModule {}
