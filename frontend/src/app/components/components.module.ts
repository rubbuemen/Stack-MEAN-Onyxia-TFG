import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes a exportar
import { DesplegableMenuComponent } from './desplegable-menu/desplegable-menu.component';
import { BannerPrincipalComponent } from './banner-principal/banner-principal.component';
import { CarouselCardsComponent } from './carousel-cards/carousel-cards.component';

@NgModule({
  declarations: [
    DesplegableMenuComponent,
    BannerPrincipalComponent,
    CarouselCardsComponent,
  ],
  exports: [
    DesplegableMenuComponent,
    BannerPrincipalComponent,
    CarouselCardsComponent,
  ],
  imports: [CommonModule],
})
export class ComponentsModule {}
