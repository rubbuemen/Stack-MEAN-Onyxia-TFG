import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesPublicComponent } from './pages.public.component';
import { PagesPrivateComponent } from './pages.private.component';

import { InicioPublicComponent } from './public/inicio/inicio.component';
import { PoliticaCookiesComponent } from './public/politica-cookies/politica-cookies.component';
import { SobreNosotrosComponent } from './public/sobre-nosotros/sobre-nosotros.component';
import { ColaboracionesComponent } from './public/colaboraciones/colaboraciones.component';
import { QuieresEntrarComponent } from './public/quieres-entrar/quieres-entrar.component';
import { EventosPublicComponent } from './public/eventos/eventos.component';
import { BasesConcursosComponent } from './public/bases-concursos/bases-concursos.component';
import { EventoPublicDisplayComponent } from './public/evento-display/evento-display.component';
import { ActividadesPublicComponent } from './public/actividades/actividades.component';
import { ActividadPublicDisplayComponent } from './public/actividad-display/actividad-display.component';
import { AlbumesFotografiasPublicComponent } from './public/albumes-fotografias/albumes-fotografias.component';
import { FotografiasPublicComponent } from './public/fotografias/fotografias.component';
import { NoticiasPublicComponent } from './public/noticias/noticias.component';
import { NoticiaDisplayPublicComponent } from './public/noticia-display/noticia-display.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegistroComponent } from '../auth/registro/registro.component';

import { InicioPrivateComponent } from './private/inicio/inicio.component';
import { RedSocialRoutingModule } from './private/red-social/red-social.routing';
import { ActorRoutingModule } from './private/actor/actor.routing';

import {
  NoAuthGuardService,
  AuthGuardService,
  NoAuthOVisitanteGuardService,
} from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PagesPublicComponent,
    children: [
      { path: '', component: InicioPublicComponent },
      { path: 'politica-cookies', component: PoliticaCookiesComponent },
      { path: 'sobre-nosotros', component: SobreNosotrosComponent },
      { path: 'colaboraciones', component: ColaboracionesComponent },
      {
        path: 'quieres-entrar',
        canActivate: [NoAuthOVisitanteGuardService],
        component: QuieresEntrarComponent,
      },
      { path: 'eventos', component: EventosPublicComponent },
      { path: 'bases-concurso', component: BasesConcursosComponent },
      { path: 'evento-display', component: EventoPublicDisplayComponent },
      { path: 'actividades', component: ActividadesPublicComponent },
      { path: 'actividad-display', component: ActividadPublicDisplayComponent },
      {
        path: 'albumes-fotografias',
        component: AlbumesFotografiasPublicComponent,
      },
      { path: 'fotografias', component: FotografiasPublicComponent },
      { path: 'noticias', component: NoticiasPublicComponent },
      { path: 'noticia-display', component: NoticiaDisplayPublicComponent },
      {
        path: 'login',
        canActivate: [NoAuthGuardService],
        component: LoginComponent,
      },
      {
        path: 'registro',
        canActivate: [NoAuthGuardService],
        component: RegistroComponent,
      },
    ],
  },
  {
    path: 'private',
    component: PagesPrivateComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      {
        path: '',
        component: InicioPrivateComponent,
        data: { titulo: 'Inicio' },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RedSocialRoutingModule,
    ActorRoutingModule,
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
