import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { RedSocialListComponent } from './red-social-list/red-social-list.component';
import { RedSocialFormComponent } from './red-social-form/red-social-form.component';
import {
  NoAuthGuardService,
  AuthGuardService,
} from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'privado/red-social',
    canActivate: [AuthGuardService],
    component: PagesPrivateComponent,
    data: { titulo: 'Redes sociales' },
    children: [
      { path: '', component: RedSocialListComponent },
      { path: 'list', component: RedSocialListComponent },
      { path: 'form', component: RedSocialFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedSocialRoutingModule {}
