import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { TramoHorarioListComponent } from './tramo-horario-list/tramo-horario-list.component';
import { TramoHorarioFormComponent } from './tramo-horario-form/tramo-horario-form.component';

import { JuntaDirectivaGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/tramo-horario',
    canActivate: [JuntaDirectivaGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: ':diaEventoId',
        canActivate: [JuntaDirectivaGuardService],
        component: TramoHorarioListComponent,
        data: { titulo: 'Listado de tramos horarios del día del evento' },
      },
      {
        path: 'form/edit/:id',
        canActivate: [JuntaDirectivaGuardService],
        component: TramoHorarioFormComponent,
        data: { titulo: 'Editar tramo horario' },
      },
      {
        path: 'form/:diaEventoId',
        canActivate: [JuntaDirectivaGuardService],
        component: TramoHorarioFormComponent,
        data: { titulo: 'Añadir tramo horario' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TramoHorarioRoutingModule {}
