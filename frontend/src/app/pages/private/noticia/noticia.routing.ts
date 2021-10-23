import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPrivateComponent } from '../../pages.private.component';

import { NoticiaListComponent } from './noticia-list/noticia-list.component';
import { NoticiaFormComponent } from './noticia-form/noticia-form.component';

import { JuntaDirectivaGuardService } from '../../../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'private/noticia',
    canActivate: [JuntaDirectivaGuardService],
    component: PagesPrivateComponent,
    children: [
      {
        path: '',
        canActivate: [JuntaDirectivaGuardService],
        component: NoticiaListComponent,
        data: { titulo: 'Listado de noticias' },
      },
      {
        path: 'form',
        canActivate: [JuntaDirectivaGuardService],
        component: NoticiaFormComponent,
        data: { titulo: 'Crear noticia' },
      },
      {
        path: 'form/:id',
        canActivate: [JuntaDirectivaGuardService],
        component: NoticiaFormComponent,
        data: { titulo: 'Editar noticia' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticiaRoutingModule {}
