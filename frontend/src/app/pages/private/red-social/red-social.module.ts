import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulo compartido
import { SharedModule } from '../../../shared/shared.module';

//Componentes de vistas
import { RedSocialListComponent } from './red-social-list/red-social-list.component';
import { RedSocialFormComponent } from './red-social-form/red-social-form.component';

@NgModule({
  declarations: [RedSocialListComponent, RedSocialFormComponent],
  exports: [RedSocialListComponent, RedSocialFormComponent],
  imports: [CommonModule, SharedModule],
})
export class RedSocialModule {}
