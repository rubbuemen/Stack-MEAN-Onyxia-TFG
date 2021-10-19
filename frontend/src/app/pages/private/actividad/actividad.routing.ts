import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { ActividadListComponent } from './actividad-list/actividad-list.component';
import { ActividadFormComponent } from './actividad-form/actividad-form.component';

import { JuntaDirectivaGuardService } from '../../../auth/auth-guard.service';
import { ActividadDisplayComponent } from './actividad-display/actividad-display.component';

const routes: Routes = [
  {
    path: 'private/actividad',
    canActivate: [JuntaDirectivaGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: '',
        canActivate: [JuntaDirectivaGuardService],
        component: ActividadListComponent,
        data: { titulo: 'Listado de actividades' },
      },
      {
        path: 'form',
        canActivate: [JuntaDirectivaGuardService],
        component: ActividadFormComponent,
        data: { titulo: 'Crear actividad' },
      },
      {
        path: 'form/:id',
        canActivate: [JuntaDirectivaGuardService],
        component: ActividadFormComponent,
        data: { titulo: 'Editar actividad' },
      },
      {
        path: 'display/:id',
        canActivate: [JuntaDirectivaGuardService],
        component: ActividadDisplayComponent,
        data: { titulo: 'Actividad' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadRoutingModule {}
