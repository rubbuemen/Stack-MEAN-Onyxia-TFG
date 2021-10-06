import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { NotificacionListComponent } from './notificacion-list/notificacion-list.component';
import { NotificacionDisplayComponent } from './notificacion-display/notificacion-display.component';
import { NotificacionFormComponent } from './notificacion-form/notificacion-form.component';

import { AuthGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/notificacion',
    canActivate: [AuthGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuardService],
        component: NotificacionListComponent,
        data: { titulo: 'Listado de notificaciones' },
      },
      {
        path: 'display/:id',
        canActivate: [AuthGuardService],
        component: NotificacionDisplayComponent,
        data: { titulo: 'Notificación' },
      },
      {
        path: 'form',
        canActivate: [AuthGuardService],
        component: NotificacionFormComponent,
        data: { titulo: 'Enviar notificación' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionRoutingModule {}
