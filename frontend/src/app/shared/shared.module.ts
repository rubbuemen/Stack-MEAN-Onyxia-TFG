import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

// Parte pública
import { HeaderPublicComponent } from './public/header/header.component';
import { MenuPublicComponent } from './public/menu/menu.component';
import { FooterPublicComponent } from './public/footer/footer.component';

// Parte privada
import { HeaderPrivateComponent } from './private/header/header.component';
import { MenuPrivateComponent } from './private/menu/menu.component';
import { FooterPrivateComponent } from './private/footer/footer.component';
import { TituloComponent } from './private/titulo/titulo.component';

//Componentes
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HeaderPublicComponent,
    MenuPublicComponent,
    FooterPublicComponent,
    HeaderPrivateComponent,
    MenuPrivateComponent,
    FooterPrivateComponent,
    TituloComponent,
  ],
  exports: [
    HeaderPublicComponent,
    MenuPublicComponent,
    FooterPublicComponent,
    HeaderPrivateComponent,
    MenuPrivateComponent,
    FooterPrivateComponent,
    TituloComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, ComponentsModule, RouterModule],
})
export class SharedModule {}
