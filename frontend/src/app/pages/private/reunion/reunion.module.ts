import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { ReunionListComponent } from './reunion-list/reunion-list.component';
import { ReunionFormComponent } from './reunion-form/reunion-form.component';
import { ReunionDisplayComponent } from './reunion-display/reunion-display.component';
import { ReunionPendientesComponent } from './reunion-pendientes/reunion-pendientes.component';
import { ReunionRealizadasComponent } from './reunion-realizadas/reunion-realizadas.component';
import { ReunionMarcarAsistenciaFormComponent } from './reunion-marcar-asistencia-form/reunion-marcar-asistencia-form.component';

@NgModule({
  declarations: [
    ReunionListComponent,
    ReunionFormComponent,
    ReunionDisplayComponent,
    ReunionPendientesComponent,
    ReunionRealizadasComponent,
    ReunionMarcarAsistenciaFormComponent,
  ],
  exports: [
    ReunionListComponent,
    ReunionFormComponent,
    ReunionDisplayComponent,
    ReunionPendientesComponent,
    ReunionRealizadasComponent,
    ReunionMarcarAsistenciaFormComponent,
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
export class ReunionModule {}
