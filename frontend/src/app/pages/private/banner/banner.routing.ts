import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerFormComponent } from './banner-form/banner-form.component';

import { PresidenteGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/banner',
    canActivate: [PresidenteGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: '',
        canActivate: [PresidenteGuardService],
        component: BannerListComponent,
        data: { titulo: 'Listado de banners' },
      },
      {
        path: 'form',
        canActivate: [PresidenteGuardService],
        component: BannerFormComponent,
        data: { titulo: 'Crear banner' },
      },
      {
        path: 'form/:id',
        canActivate: [PresidenteGuardService],
        component: BannerFormComponent,
        data: { titulo: 'Editar banner' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerRoutingModule {}
