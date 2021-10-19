import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { InscripcionEventoFormComponent } from './inscripcion-evento-form/inscripcion-evento-form.component';
import { InscripcionEventoPendientesComponent } from './inscripcion-evento-pendientes/inscripcion-evento-pendientes.component';
import { InscripcionEventoAceptadasComponent } from './inscripcion-evento-aceptadas/inscripcion-evento-aceptadas.component';

@NgModule({
  declarations: [
    InscripcionEventoFormComponent,
    InscripcionEventoPendientesComponent,
    InscripcionEventoAceptadasComponent,
  ],
  exports: [
    InscripcionEventoFormComponent,
    InscripcionEventoPendientesComponent,
    InscripcionEventoAceptadasComponent,
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
export class InscripcionEventoModule {}
