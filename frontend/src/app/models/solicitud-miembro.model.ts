import { Miembro } from './miembro.model';
import * as mongoose from 'mongoose';

export class SolicitudMiembro {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
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
