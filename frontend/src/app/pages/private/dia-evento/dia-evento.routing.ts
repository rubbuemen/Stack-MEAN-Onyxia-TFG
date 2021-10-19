import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { DiaEventoListComponent } from './dia-evento-list/dia-evento-list.component';

import { JuntaDirectivaGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/dia-evento',
    canActivate: [JuntaDirectivaGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: ':eventoId',
        canActivate: [JuntaDirectivaGuardService],
        component: DiaEventoListComponent,
        data: { titulo: 'Listado de días del evento' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiaEventoRoutingModule {}
