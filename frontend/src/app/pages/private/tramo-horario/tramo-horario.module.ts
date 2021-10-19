import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { TramoHorarioListComponent } from './tramo-horario-list/tramo-horario-list.component';
import { TramoHorarioFormComponent } from './tramo-horario-form/tramo-horario-form.component';

@NgModule({
  declarations: [TramoHorarioListComponent, TramoHorarioFormComponent],
  exports: [TramoHorarioListComponent, TramoHorarioFormComponent],
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
export class TramoHorarioModule {}
