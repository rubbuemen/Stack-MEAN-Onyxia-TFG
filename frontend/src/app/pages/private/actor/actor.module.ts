import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { ActorDisplayComponent } from './actor-display/actor-display.component';
import { ActorSelfDisplayComponent } from './actor-self-display/actor-self-display.component';
import { ActorFormComponent } from './actor-form/actor-form.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { MiembrosListComponent } from './miembros-list/miembros-list.component';
import { VisitantesListComponent } from './visitantes-list/visitantes-list.component';
import { ActorSelfFormComponent } from './actor-self-form/actor-self-form.component';

@NgModule({
  declarations: [
    ActorDisplayComponent,
    ActorSelfDisplayComponent,
    ActorSelfFormComponent,
    ActorFormComponent,
    ActorListComponent,
    MiembrosListComponent,
    VisitantesListComponent,
  ],
  exports: [
    ActorDisplayComponent,
    ActorSelfDisplayComponent,
    ActorSelfFormComponent,
    ActorFormComponent,
    ActorListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class ActorModule {}
