import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { FotografiaListComponent } from './fotografia-list/fotografia-list.component';
import { FotografiaFormComponent } from './fotografia-form/fotografia-form.component';

@NgModule({
  declarations: [FotografiaListComponent, FotografiaFormComponent],
  exports: [FotografiaListComponent, FotografiaFormComponent],
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
export class FotografiaModule {}
