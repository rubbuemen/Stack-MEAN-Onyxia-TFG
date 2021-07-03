import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { ActorDisplayComponent } from './actor-display/actor-display.component';
import { ActorFormComponent } from './actor-form/actor-form.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { MiembrosListComponent } from './miembros-list/miembros-list.component';
import { VisitantesListComponent } from './visitantes-list/visitantes-list.component';

const routes: Routes = [
  {
    path: 'private/actor',
    component: PagesPrivateComponent,
    children: [
      {
        path: '',
        component: ActorDisplayComponent,
        data: { titulo: 'Perfil de usuario' },
      },
      {
        path: 'display',
        component: ActorDisplayComponent,
        data: { titulo: 'Perfil de usuario' },
      },
      {
        path: 'form',
        component: ActorFormComponent,
        data: { titulo: 'Editar usuario' },
      },
      {
        path: 'list',
        component: ActorListComponent,
        data: { titulo: 'Usuarios' },
      },
      {
        path: 'list/miembros',
        component: MiembrosListComponent,
        data: { titulo: 'Usuarios miembros' },
      },
      {
        path: 'list/visitantes',
        component: VisitantesListComponent,
        data: { titulo: 'Usuarios visitantes' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActorRoutingModule {}
