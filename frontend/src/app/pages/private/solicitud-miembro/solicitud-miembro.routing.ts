import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { SolicitudMiembroDisplayComponent } from './solicitud-miembro-display/solicitud-miembro-display.component';
import { SolicitudMiembroPagoComponent } from './solicitud-miembro-pago/solicitud-miembro-pago.component';

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
        component: SolicitudMiembroDisplayComponent,
        data: { titulo: 'Estado de la solicitud para ser miembro' },
      },
      {
        path: 'pago/:id',
        canActivate: [VisitanteGuardService],
        component: SolicitudMiembroPagoComponent,
        data: { titulo: 'Pago de la solicitud para ser miembro' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudMiembroRoutingModule {}
