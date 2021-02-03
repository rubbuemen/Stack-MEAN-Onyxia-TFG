import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { ActorDisplayComponent } from './actor-display/actor-display.component';
import { ActorFormComponent } from './actor-form/actor-form.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { MiembrosListComponent } from './miembros-list/miembros-list.component';
import { VisitantesListComponent } from './visitantes-list/visitantes-list.component';

@NgModule({
  declarations: [ActorDisplayComponent, ActorFormComponent, ActorListComponent, MiembrosListComponent, VisitantesListComponent],
  exports: [ActorDisplayComponent, ActorFormComponent, ActorListComponent],
  imports: [CommonModule, SharedModule],
})
export class ActorModule {}
