import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxStripeModule } from 'ngx-stripe';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { SolicitudMiembroDisplayComponent } from './solicitud-miembro-display/solicitud-miembro-display.component';
import { SolicitudMiembroPagoComponent } from './solicitud-miembro-pago/solicitud-miembro-pago.component';
import { SolicitudMiembroPendientesComponent } from './solicitud-miembro-pendientes/solicitud-miembro-pendientes.component';
import { SolicitudMiembroRechazadasComponent } from './solicitud-miembro-rechazadas/solicitud-miembro-rechazadas.component';
import { SolicitudMiembroAceptadasComponent } from './solicitud-miembro-aceptadas/solicitud-miembro-aceptadas.component';
import { SolicitudMiembroListComponent } from './solicitud-miembro-list/solicitud-miembro-list.component';
import { SolicitudMiembroSelfDisplayComponent } from './solicitud-miembro-self-display/solicitud-miembro-self-display.component';

import { environment } from '../../../../environments/environment.prod';

const token_stripe = environment.token_stripe;

@NgModule({
  declarations: [
    SolicitudMiembroDisplayComponent,
    SolicitudMiembroPagoComponent,
    SolicitudMiembroPendientesComponent,
    SolicitudMiembroRechazadasComponent,
    SolicitudMiembroAceptadasComponent,
    SolicitudMiembroListComponent,
    SolicitudMiembroSelfDisplayComponent,
  ],
  exports: [
    SolicitudMiembroDisplayComponent,
    SolicitudMiembroPagoComponent,
    SolicitudMiembroPendientesComponent,
    SolicitudMiembroRechazadasComponent,
    SolicitudMiembroAceptadasComponent,
    SolicitudMiembroListComponent,
    SolicitudMiembroSelfDisplayComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DataTablesModule,
    NgxStripeModule.forChild(token_stripe),
  ],
})
export class SolicitudMiembroModule {}
