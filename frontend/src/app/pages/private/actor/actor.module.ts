import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { ActorDisplayComponent } from './actor-display/actor-display.component';
import { ActorSelfDisplayComponent } from './actor-self-display/actor-self-display.component';
import { ActorFormComponent } from './actor-form/actor-form.component';
import { MiembroListComponent } from './miembro-list/miembro-list.component';
import { VisitanteListComponent } from './visitante-list/visitante-list.component';
import { ActorSelfFormComponent } from './actor-self-form/actor-self-form.component';
import { ConvertirMiembroComponent } from './convertir-miembro/convertir-miembro.component';

@NgModule({
  declarations: [
    ActorDisplayComponent,
    ActorSelfDisplayComponent,
    ActorSelfFormComponent,
    ActorFormComponent,
    MiembroListComponent,
    VisitanteListComponent,
    ConvertirMiembroComponent,
  ],
  exports: [
    ActorDisplayComponent,
    ActorSelfDisplayComponent,
    ActorSelfFormComponent,
    ActorFormComponent,
    MiembroListComponent,
    VisitanteListComponent,
    ConvertirMiembroComponent,
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
export class ActorModule {}
