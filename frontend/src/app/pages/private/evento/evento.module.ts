import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { EventoListComponent } from './evento-list/evento-list.component';
import { EventoFormComponent } from './evento-form/evento-form.component';
import { EventoDisplayComponent } from './evento-display/evento-display.component';
import { EventoListPublicComponent } from './evento-list-public/evento-list-public.component';
import { EventoDisplayPublicComponent } from './evento-display-public/evento-display-public.component';

@NgModule({
  declarations: [
    EventoListComponent,
    EventoFormComponent,
    EventoDisplayComponent,
    EventoListPublicComponent,
    EventoDisplayPublicComponent,
  ],
  exports: [EventoListComponent, EventoFormComponent, EventoDisplayComponent],
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
export class EventoModule {}
