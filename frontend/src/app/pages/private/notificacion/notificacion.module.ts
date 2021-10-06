import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { NotificacionListComponent } from './notificacion-list/notificacion-list.component';
import { NotificacionDisplayComponent } from './notificacion-display/notificacion-display.component';
import { NotificacionFormComponent } from './notificacion-form/notificacion-form.component';

@NgModule({
  declarations: [NotificacionListComponent, NotificacionDisplayComponent, NotificacionFormComponent],
  exports: [NotificacionListComponent, NotificacionDisplayComponent],
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
export class NotificacionModule {}
