import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { FotografiaListComponent } from './fotografia-list/fotografia-list.component';
import { FotografiaFormComponent } from './fotografia-form/fotografia-form.component';

import { JuntaDirectivaGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/fotografia',
    canActivate: [JuntaDirectivaGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: ':albumFotografiasId',
        canActivate: [JuntaDirectivaGuardService],
        component: FotografiaListComponent,
        data: { titulo: 'Listado de fotografías del álbum' },
      },
      {
        path: 'form/:albumFotografiasId',
        canActivate: [JuntaDirectivaGuardService],
        component: FotografiaFormComponent,
        data: { titulo: 'Añadir fotografía' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotografiaRoutingModule {}
