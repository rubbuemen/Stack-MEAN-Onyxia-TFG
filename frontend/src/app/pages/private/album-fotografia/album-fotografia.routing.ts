import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { AlbumFotografiaListComponent } from './album-fotografia-list/album-fotografia-list.component';
import { AlbumFotografiaFormComponent } from './album-fotografia-form/album-fotografia-form.component';

import { JuntaDirectivaGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/album-fotografia',
    canActivate: [JuntaDirectivaGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: ':eventoId',
        canActivate: [JuntaDirectivaGuardService],
        component: AlbumFotografiaListComponent,
        data: { titulo: 'Listado de álbumes de fotografías del evento' },
      },
      {
        path: 'form/:eventoId',
        canActivate: [JuntaDirectivaGuardService],
        component: AlbumFotografiaFormComponent,
        data: { titulo: 'Crear álbum de fotografías' },
      },
      {
        path: 'form/edit/:id',
        canActivate: [JuntaDirectivaGuardService],
        component: AlbumFotografiaFormComponent,
        data: { titulo: 'Editar álbum de fotografías' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumFotografiaRoutingModule {}
