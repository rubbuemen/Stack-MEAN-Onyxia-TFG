import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { InventarioListComponent } from './inventario-list/inventario-list.component';
import { InventarioFormComponent } from './inventario-form/inventario-form.component';

import { JuntaDirectivaGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/inventario',
    canActivate: [JuntaDirectivaGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: ':materialId',
        canActivate: [JuntaDirectivaGuardService],
        component: InventarioListComponent,
        data: { titulo: 'Listado de inventarios' },
      },
      {
        path: 'form/:materialId',
        canActivate: [JuntaDirectivaGuardService],
        component: InventarioFormComponent,
        data: { titulo: 'Crear inventario' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioRoutingModule {}
