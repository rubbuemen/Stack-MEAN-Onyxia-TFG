import { Miembro } from './miembro.model';

export class SolicitudMiembro {
  constructor(
    public tieneCochePropio: boolean,
    public comoHaConocidoAsociacion: string,
    public intereses: string[],
    public habilidades: string,
    public ideas: string,
    public estadoSolicitud: string,
    public estaPagado: boolean,
    public miembrosConocidos?: Miembro[]
  ) {}
}
