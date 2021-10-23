import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { ReunionListComponent } from './reunion-list/reunion-list.component';
import { ReunionFormComponent } from './reunion-form/reunion-form.component';
import { ReunionDisplayComponent } from './reunion-display/reunion-display.component';
import { ReunionPendientesComponent } from './reunion-pendientes/reunion-pendientes.component';
import { ReunionRealizadasComponent } from './reunion-realizadas/reunion-realizadas.component';
import { ReunionMarcarAsistenciaFormComponent } from './reunion-marcar-asistencia-form/reunion-marcar-asistencia-form.component';

import {
  PresidenteGuardService,
  MiembroGuardService,
} from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/reunion',
    canActivate: [MiembroGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: 'gestion',
        canActivate: [PresidenteGuardService],
        component: ReunionListComponent,
        data: { titulo: 'Gestionar reuniones' },
      },
      {
        path: 'form',
        canActivate: [PresidenteGuardService],
        component: ReunionFormComponent,
        data: { titulo: 'Crear reunión' },
      },
      {
        path: 'form/:id',
        canActivate: [PresidenteGuardService],
        component: ReunionFormComponent,
        data: { titulo: 'Editar reunión' },
      },
      {
        path: 'marcarAsistenciaForm/:reunionId',
        canActivate: [MiembroGuardService],
        component: ReunionMarcarAsistenciaFormComponent,
        data: { titulo: 'Marcar asistencia a la reunión' },
      },
      {
        path: 'display/:id',
        canActivate: [MiembroGuardService],
        component: ReunionDisplayComponent,
        data: { titulo: 'Reunion' },
      },
      {
        path: 'pendientes',
        canActivate: [MiembroGuardService],
        component: ReunionPendientesComponent,
        data: { titulo: 'Listado de reuniones pendientes' },
      },
      {
        path: 'realizadas',
        canActivate: [MiembroGuardService],
        component: ReunionRealizadasComponent,
        data: { titulo: 'Listado de reuniones realizadas' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReunionRoutingModule {}
