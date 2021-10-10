import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { ActorSelfDisplayComponent } from './actor-self-display/actor-self-display.component';
import { ActorDisplayComponent } from './actor-display/actor-display.component';
import { ActorFormComponent } from './actor-form/actor-form.component';
import { MiembroListComponent } from './miembro-list/miembro-list.component';
import { VisitanteListComponent } from './visitante-list/visitante-list.component';
import { ActorSelfFormComponent } from './actor-self-form/actor-self-form.component';

import {
  AuthGuardService,
  MiembroGuardService,
  PresidenteGuardService,
  PresidenteSecretarioGuardService,
} from '../../../auth/auth-guard.service';
import { ConvertirMiembroComponent } from './convertir-miembro/convertir-miembro.component';

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
        path: 'self-form',
        canActivate: [AuthGuardService],
        component: ActorSelfFormComponent,
        data: { titulo: 'Editar usuario' },
      },
      {
        path: 'display/:id',
        canActivate: [MiembroGuardService],
        component: ActorDisplayComponent,
        data: { titulo: 'Perfil de usuario' },
      },
      {
        path: 'form/:id',
        canActivate: [PresidenteGuardService],
        component: ActorFormComponent,
        data: { titulo: 'Editar usuario' },
      },
      {
        path: 'list/miembro',
        canActivate: [MiembroGuardService],
        component: MiembroListComponent,
        data: { titulo: 'Usuarios miembros' },
      },
      {
        path: 'list/visitante',
        canActivate: [PresidenteSecretarioGuardService],
        component: VisitanteListComponent,
        data: { titulo: 'Usuarios visitantes' },
      },
      {
        path: 'convertirMiembro/:actorId',
        canActivate: [PresidenteSecretarioGuardService],
        component: ConvertirMiembroComponent,
        data: { titulo: 'Editar usuario' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActorRoutingModule {}
