import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { InventarioListComponent } from './inventario-list/inventario-list.component';
import { InventarioFormComponent } from './inventario-form/inventario-form.component';

@NgModule({
  declarations: [InventarioListComponent, InventarioFormComponent],
  exports: [InventarioListComponent, InventarioFormComponent],
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
export class InventarioModule {}
