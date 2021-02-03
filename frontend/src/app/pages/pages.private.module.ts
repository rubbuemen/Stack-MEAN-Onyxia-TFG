import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Parte privada
import { InicioPrivateComponent } from './private/inicio/inicio.component';
import { RedSocialModule } from './private/red-social/red-social.module';
import { ActorModule } from './private/actor/actor.module';

//Módulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { AuthModule } from '../auth/auth.module';

import { PagesPrivateComponent } from './pages.private.component';

@NgModule({
  declarations: [InicioPrivateComponent, PagesPrivateComponent],
  exports: [InicioPrivateComponent, PagesPrivateComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    RouterModule,
    ComponentsModule,
    FontAwesomeModule,
    RedSocialModule,
    ActorModule,
  ],
})
export class PagesPrivateModule {}
