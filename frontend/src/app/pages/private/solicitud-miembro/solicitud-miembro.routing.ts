import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { PresidenteGuardService } from '../../../auth/auth-guard.service';

import { SolicitudMiembroDisplayComponent } from './solicitud-miembro-display/solicitud-miembro-display.component';
import { SolicitudMiembroPagoComponent } from './solicitud-miembro-pago/solicitud-miembro-pago.component';
import { SolicitudMiembroPendientesComponent } from './solicitud-miembro-pendientes/solicitud-miembro-pendientes.component';
import { SolicitudMiembroRechazadasComponent } from './solicitud-miembro-rechazadas/solicitud-miembro-rechazadas.component';
import { SolicitudMiembroAceptadasComponent } from './solicitud-miembro-aceptadas/solicitud-miembro-aceptadas.component';
import { SolicitudMiembroListComponent } from './solicitud-miembro-list/solicitud-miembro-list.component';
import { SolicitudMiembroSelfDisplayComponent } from './solicitud-miembro-self-display/solicitud-miembro-self-display.component';

import {
  AuthGuardService,
  VisitanteGuardService,
} from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/solicitud-miembro',
    canActivate: [AuthGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuardService],
        component: SolicitudMiembroSelfDisplayComponent,
        data: { titulo: 'Estado de la solicitud para ser miembro' },
      },
      {
        path: 'pago/:id',
        canActivate: [VisitanteGuardService],
        component: SolicitudMiembroPagoComponent,
        data: { titulo: 'Pago de la solicitud para ser miembro' },
      },
      {
        path: 'pendientes',
        canActivate: [PresidenteGuardService],
        component: SolicitudMiembroPendientesComponent,
        data: { titulo: 'Solicitudes pendientes' },
      },
      {
        path: 'rechazadas',
        canActivate: [PresidenteGuardService],
        component: SolicitudMiembroRechazadasComponent,
        data: { titulo: 'Solicitudes rechazadas' },
      },
      {
        path: 'aceptadas',
        canActivate: [PresidenteGuardService],
        component: SolicitudMiembroAceptadasComponent,
        data: { titulo: 'Solicitudes aceptadas pendientes de pago' },
      },
      {
        path: 'list',
        canActivate: [PresidenteGuardService],
        component: SolicitudMiembroListComponent,
        data: { titulo: 'Solicitudes aceptadas y pagadas' },
      },
      {
        path: 'display/:id',
        canActivate: [AuthGuardService],
        component: SolicitudMiembroDisplayComponent,
        data: { titulo: 'Estado de la solicitud para ser miembro' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudMiembroRoutingModule {}
