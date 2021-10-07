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

import { environment } from '../../../../environments/environment.prod';

const token_stripe = environment.token_stripe;

@NgModule({
  declarations: [
    SolicitudMiembroDisplayComponent,
    SolicitudMiembroPagoComponent,
  ],
  exports: [SolicitudMiembroDisplayComponent, SolicitudMiembroPagoComponent],
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
