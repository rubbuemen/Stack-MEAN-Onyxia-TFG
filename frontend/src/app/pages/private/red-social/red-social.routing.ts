import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { RedSocialListComponent } from './red-social-list/red-social-list.component';
import { RedSocialFormComponent } from './red-social-form/red-social-form.component';
import { RedSocialSelfListComponent } from './red-social-self-list/red-social-self-list.component';
import { RedSocialSelfFormComponent } from './red-social-self-form/red-social-self-form.component';
import {
  AuthGuardService,
  PresidenteGuardService,
} from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/red-social',
    canActivate: [AuthGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuardService],
        component: RedSocialSelfListComponent,
        data: { titulo: 'Listado de redes sociales' },
      },
      {
        path: 'self-form',
        canActivate: [AuthGuardService],
        component: RedSocialSelfFormComponent,
        data: { titulo: 'Crear red social' },
      },
      {
        path: 'self-form/:id',
        canActivate: [AuthGuardService],
        component: RedSocialSelfFormComponent,
        data: { titulo: 'Editar red social' },
      },
      {
        path: 'list/:id',
        canActivate: [PresidenteGuardService],
        component: RedSocialListComponent,
        data: { titulo: 'Listado de redes sociales' },
      },
      {
        path: 'form/:id',
        canActivate: [PresidenteGuardService],
        component: RedSocialFormComponent,
        data: { titulo: 'Editar red social' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedSocialRoutingModule {}
