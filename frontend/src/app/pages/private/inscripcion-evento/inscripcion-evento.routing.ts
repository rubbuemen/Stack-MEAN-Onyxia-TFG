import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { InscripcionEventoFormComponent } from './inscripcion-evento-form/inscripcion-evento-form.component';
import { InscripcionEventoPendientesComponent } from './inscripcion-evento-pendientes/inscripcion-evento-pendientes.component';
import { InscripcionEventoAceptadasComponent } from './inscripcion-evento-aceptadas/inscripcion-evento-aceptadas.component';

import {
  JuntaDirectivaGuardService,
  MiembroGuardService,
} from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/inscripcion-evento',
    canActivate: [MiembroGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: ':eventoId',
        canActivate: [MiembroGuardService],
        component: InscripcionEventoFormComponent,
        data: { titulo: 'Inscribirse al evento' },
      },
      {
        path: 'pendientes/:eventoId',
        canActivate: [JuntaDirectivaGuardService],
        component: InscripcionEventoPendientesComponent,
        data: { titulo: 'Inscripciones pendientes del evento' },
      },
      {
        path: 'aceptadas/:eventoId',
        canActivate: [JuntaDirectivaGuardService],
        component: InscripcionEventoAceptadasComponent,
        data: { titulo: 'Inscripciones aceptadas del evento' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionEventoRoutingModule {}
