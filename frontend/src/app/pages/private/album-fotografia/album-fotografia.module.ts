import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { AlbumFotografiaListComponent } from './album-fotografia-list/album-fotografia-list.component';
import { AlbumFotografiaFormComponent } from './album-fotografia-form/album-fotografia-form.component';

@NgModule({
  declarations: [AlbumFotografiaListComponent, AlbumFotografiaFormComponent],
  exports: [AlbumFotografiaListComponent, AlbumFotografiaFormComponent],
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
export class AlbumFotografiaModule {}
