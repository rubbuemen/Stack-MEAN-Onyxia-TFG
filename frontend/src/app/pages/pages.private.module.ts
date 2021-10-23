import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Parte privada
import { InicioPrivateComponent } from './private/inicio/inicio.component';
import { RedSocialModule } from './private/red-social/red-social.module';
import { ActorModule } from './private/actor/actor.module';
import { NotificacionModule } from './private/notificacion/notificacion.module';
import { BuzonModule } from './private/buzon/buzon.module';
import { SolicitudMiembroModule } from './private/solicitud-miembro/solicitud-miembro.module';
import { MaterialModule } from './private/material/material.module';
import { InventarioModule } from './private/inventario/inventario.module';
import { ActividadModule } from './private/actividad/actividad.module';
import { EventoModule } from './private/evento/evento.module';
import { DiaEventoModule } from './private/dia-evento/dia-evento.module';
import { TramoHorarioModule } from './private/tramo-horario/tramo-horario.module';
import { InscripcionEventoModule } from './private/inscripcion-evento/inscripcion-evento.module';
import { ActividadMiembroTramoModule } from './private/actividad-miembro-tramo/actividad-miembro-tramo.module';
import { AlbumFotografiaModule } from './private/album-fotografia/album-fotografia.module';
import { FotografiaModule } from './private/fotografia/fotografia.module';
import { ReunionModule } from './private/reunion/reunion.module';
import { NoticiaModule } from './private/noticia/noticia.module';

//Módulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { AuthModule } from '../auth/auth.module';
import { NgxStripeModule } from 'ngx-stripe';

import { PagesPrivateComponent } from './pages.private.component';

import { environment } from '../../environments/environment.prod';

const token_stripe = environment.token_stripe;

@NgModule({
  declarations: [InicioPrivateComponent, PagesPrivateComponent],
  exports: [InicioPrivateComponent, PagesPrivateComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    FontAwesomeModule,
    DataTablesModule,
    RedSocialModule,
    ActorModule,
    NotificacionModule,
    BuzonModule,
    SolicitudMiembroModule,
    MaterialModule,
    InventarioModule,
    ActividadModule,
    EventoModule,
    DiaEventoModule,
    TramoHorarioModule,
    InscripcionEventoModule,
    ActividadMiembroTramoModule,
    AlbumFotografiaModule,
    FotografiaModule,
    ReunionModule,
    NoticiaModule,
    NgxStripeModule.forChild(token_stripe),
  ],
})
export class PagesPrivateModule {}
