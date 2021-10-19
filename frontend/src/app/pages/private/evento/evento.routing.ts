import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { EventoListComponent } from './evento-list/evento-list.component';
import { EventoFormComponent } from './evento-form/evento-form.component';
import { EventoDisplayComponent } from './evento-display/evento-display.component';
import { EventoListPublicComponent } from './evento-list-public/evento-list-public.component';
import { EventoDisplayPublicComponent } from './evento-display-public/evento-display-public.component';

import {
  JuntaDirectivaGuardService,
  MiembroGuardService,
} from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/evento',
    canActivate: [MiembroGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: 'gestion',
        canActivate: [JuntaDirectivaGuardService],
        component: EventoListComponent,
        data: { titulo: 'Listado de eventos' },
      },
      {
        path: 'form',
        canActivate: [JuntaDirectivaGuardService],
        component: EventoFormComponent,
        data: { titulo: 'Crear evento' },
      },
      {
        path: 'form/:id',
        canActivate: [JuntaDirectivaGuardService],
        component: EventoFormComponent,
        data: { titulo: 'Editar evento' },
      },
      {
        path: 'display/:id',
        canActivate: [JuntaDirectivaGuardService],
        component: EventoDisplayComponent,
        data: { titulo: 'Evento' },
      },
      {
        path: 'publicos',
        canActivate: [MiembroGuardService],
        component: EventoListPublicComponent,
        data: { titulo: 'Listado de eventos' },
      },
      {
        path: 'displayPublico/:id',
        canActivate: [MiembroGuardService],
        component: EventoDisplayPublicComponent,
        data: { titulo: 'Evento' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventoRoutingModule {}
