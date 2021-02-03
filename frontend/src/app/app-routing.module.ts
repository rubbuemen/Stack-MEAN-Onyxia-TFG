import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Módulos
import { PagesRoutingModule } from './pages/pages.routing';

import { ErrorComponent } from './error/error.component';

const routes: Routes = [{ path: '**', component: ErrorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
