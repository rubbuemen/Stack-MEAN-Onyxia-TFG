import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { ActorSelfDisplayComponent } from './actor-self-display/actor-self-display.component';
import { ActorDisplayComponent } from './actor-display/actor-display.component';
import { ActorFormComponent } from './actor-form/actor-form.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { MiembrosListComponent } from './miembros-list/miembros-list.component';
import { VisitantesListComponent } from './visitantes-list/visitantes-list.component';
import { AuthGuardService } from '../../../auth/auth-guard.service';
import { ActorSelfFormComponent } from './actor-self-form/actor-self-form.component';

const routes: Routes = [
  {
    path: 'private/actor',
    canActivate: [AuthGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuardService],
        component: ActorSelfDisplayComponent,
        data: { titulo: 'Perfil de usuario' },
      },
      {
        path: 'display',
        canActivate: [AuthGuardService],
        component: ActorDisplayComponent,
        data: { titulo: 'Perfil de usuario' },
      },
      {
        path: 'self-form',
        canActivate: [AuthGuardService],
        component: ActorSelfFormComponent,
        data: { titulo: 'Editar usuario' },
      },
      {
        path: 'form/:id',
        canActivate: [AuthGuardService],
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
