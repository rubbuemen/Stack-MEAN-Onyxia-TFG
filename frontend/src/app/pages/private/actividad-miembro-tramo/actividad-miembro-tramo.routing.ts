import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { ActividadMiembroTramoListComponent } from './actividad-miembro-tramo-list/actividad-miembro-tramo-list.component';
import { ActividadMiembroTramoFormComponent } from './actividad-miembro-tramo-form/actividad-miembro-tramo-form.component';

import { JuntaDirectivaGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/horario',
    canActivate: [JuntaDirectivaGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: ':eventoId',
        canActivate: [JuntaDirectivaGuardService],
        component: ActividadMiembroTramoListComponent,
        data: { titulo: 'Listado de horarios del evento' },
      },
      {
        path: 'form/:eventoId',
        canActivate: [JuntaDirectivaGuardService],
        component: ActividadMiembroTramoFormComponent,
        data: { titulo: 'Crear horario para el evento' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadMiembroTramoRoutingModule {}
