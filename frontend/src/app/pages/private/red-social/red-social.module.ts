import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { RedSocialListComponent } from './red-social-list/red-social-list.component';
import { RedSocialFormComponent } from './red-social-form/red-social-form.component';
import { RedSocialSelfListComponent } from './red-social-self-list/red-social-self-list.component';
import { RedSocialSelfFormComponent } from './red-social-self-form/red-social-self-form.component';

@NgModule({
  declarations: [
    RedSocialListComponent,
    RedSocialFormComponent,
    RedSocialSelfListComponent,
    RedSocialSelfFormComponent,
  ],
  exports: [
    RedSocialListComponent,
    RedSocialFormComponent,
    RedSocialSelfListComponent,
    RedSocialSelfFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DataTablesModule,
  ],
})
export class RedSocialModule {}
