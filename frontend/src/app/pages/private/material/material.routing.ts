import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { MaterialListComponent } from './material-list/material-list.component';
import { MaterialFormComponent } from './material-form/material-form.component';

import { JuntaDirectivaGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/material',
    canActivate: [JuntaDirectivaGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: '',
        canActivate: [JuntaDirectivaGuardService],
        component: MaterialListComponent,
        data: { titulo: 'Listado de materiales' },
      },
      {
        path: 'form',
        canActivate: [JuntaDirectivaGuardService],
        component: MaterialFormComponent,
        data: { titulo: 'Crear material' },
      },
      {
        path: 'form/:id',
        canActivate: [JuntaDirectivaGuardService],
        component: MaterialFormComponent,
        data: { titulo: 'Editar material' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule {}
