import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Parte pública
import { InicioPublicComponent } from './public/inicio/inicio.component';
import { PoliticaCookiesComponent } from './public/politica-cookies/politica-cookies.component';
import { SobreNosotrosComponent } from './public/sobre-nosotros/sobre-nosotros.component';
import { ColaboracionesComponent } from './public/colaboraciones/colaboraciones.component';
import { QuieresEntrarComponent } from './public/quieres-entrar/quieres-entrar.component';
import { EventosPublicComponent } from './public/eventos/eventos.component';
import { EventoPublicDisplayComponent } from './public/evento-display/evento-display.component';
import { BasesConcursosComponent } from './public/bases-concursos/bases-concursos.component';
import { ActividadesPublicComponent } from './public/actividades/actividades.component';
import { ActividadPublicDisplayComponent } from './public/actividad-display/actividad-display.component';
import { AlbumesFotografiasPublicComponent } from './public/albumes-fotografias/albumes-fotografias.component';
import { FotografiasPublicComponent } from './public/fotografias/fotografias.component';
import { NoticiasPublicComponent } from './public/noticias/noticias.component';
import { NoticiaDisplayPublicComponent } from './public/noticia-display/noticia-display.component';

//Módulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { AuthModule } from '../auth/auth.module';

import { PagesPublicComponent } from './pages.public.component';

@NgModule({
  declarations: [
    InicioPublicComponent,
    PoliticaCookiesComponent,
    SobreNosotrosComponent,
    ColaboracionesComponent,
    QuieresEntrarComponent,
    EventosPublicComponent,
    EventoPublicDisplayComponent,
    BasesConcursosComponent,
    ActividadesPublicComponent,
    ActividadPublicDisplayComponent,
    AlbumesFotografiasPublicComponent,
    FotografiasPublicComponent,
    NoticiasPublicComponent,
    NoticiaDisplayPublicComponent,
    PagesPublicComponent,
  ],
  exports: [
    InicioPublicComponent,
    PoliticaCookiesComponent,
    SobreNosotrosComponent,
    ColaboracionesComponent,
    QuieresEntrarComponent,
    EventosPublicComponent,
    EventoPublicDisplayComponent,
    BasesConcursosComponent,
    ActividadesPublicComponent,
    ActividadPublicDisplayComponent,
    AlbumesFotografiasPublicComponent,
    FotografiasPublicComponent,
    NoticiasPublicComponent,
    NoticiaDisplayPublicComponent,
    PagesPublicComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    RouterModule,
    ComponentsModule,
    FontAwesomeModule,
  ],
})
export class PagesPublicModule {}
