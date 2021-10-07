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
    NgxStripeModule.forChild(token_stripe),
  ],
})
export class PagesPrivateModule {}
