import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { BuzonFormComponent } from './buzon-form/buzon-form.component';

import { AuthGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/buzon',
    canActivate: [AuthGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: 'form',
        canActivate: [AuthGuardService],
        component: BuzonFormComponent,
        data: { titulo: 'Crear buzón' },
      },
      {
        path: 'form/:id',
        canActivate: [AuthGuardService],
        component: BuzonFormComponent,
        data: { titulo: 'Editar buzón' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuzonRoutingModule {}
