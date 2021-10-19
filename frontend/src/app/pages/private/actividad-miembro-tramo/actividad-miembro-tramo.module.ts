import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { ActividadMiembroTramoListComponent } from './actividad-miembro-tramo-list/actividad-miembro-tramo-list.component';
import { ActividadMiembroTramoFormComponent } from './actividad-miembro-tramo-form/actividad-miembro-tramo-form.component';

@NgModule({
  declarations: [
    ActividadMiembroTramoListComponent,
    ActividadMiembroTramoFormComponent,
  ],
  exports: [
    ActividadMiembroTramoListComponent,
    ActividadMiembroTramoFormComponent,
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
export class ActividadMiembroTramoModule {}
