import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes a exportar
import { DesplegableMenuComponent } from './desplegable-menu/desplegable-menu.component';
import { BannerPrincipalComponent } from './banner-principal/banner-principal.component';
import { CarouselCardsComponent } from './carousel-cards/carousel-cards.component';
import { ModoMantenimientoComponent } from './modo-mantenimiento/modo-mantenimiento/modo-mantenimiento.component';

@NgModule({
  declarations: [
    DesplegableMenuComponent,
    BannerPrincipalComponent,
    CarouselCardsComponent,
    ModoMantenimientoComponent,
  ],
  exports: [
    DesplegableMenuComponent,
    BannerPrincipalComponent,
    CarouselCardsComponent,
    ModoMantenimientoComponent,
  ],
  imports: [CommonModule],
})
export class ComponentsModule {}
