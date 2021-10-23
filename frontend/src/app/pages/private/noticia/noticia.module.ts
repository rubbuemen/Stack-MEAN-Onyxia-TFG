import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { NoticiaListComponent } from './noticia-list/noticia-list.component';
import { NoticiaFormComponent } from './noticia-form/noticia-form.component';

@NgModule({
  declarations: [NoticiaListComponent, NoticiaFormComponent],
  exports: [NoticiaListComponent, NoticiaFormComponent],
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
export class NoticiaModule {}
