import { Miembro } from '../models/miembro.model';

export interface SolicitudMiembroForm {
    comoHaConocidoAsociacion: string,
    intereses: string[],
    habilidades: string,
    ideas: string,
    tieneCochePropio: boolean,
    miembrosConocidos?: Miembro[]
}