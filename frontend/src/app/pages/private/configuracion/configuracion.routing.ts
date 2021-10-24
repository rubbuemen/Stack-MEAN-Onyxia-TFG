import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { ConfiguracionDisplayComponent } from './configuracion-display/configuracion-display.component';

import { PresidenteGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/configuracion',
    canActivate: [PresidenteGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: 'gestion',
        canActivate: [PresidenteGuardService],
        component: ConfiguracionDisplayComponent,
        data: { titulo: 'Gestionar configuración pública' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule {}
