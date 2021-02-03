import { Banner } from './banner.model';

export class Configuracion {
  constructor(
    public modoMantenimiento: boolean,
    public ocultarBanners: boolean,
    public bannersPrincipales?: Banner[]
  ) {}
}
