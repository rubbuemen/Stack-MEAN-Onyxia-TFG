import { Miembro } from './miembro.model';
import { Actividad } from './actividad.model';
import { Evento } from './evento.model';
import * as mongoose from 'mongoose';

export class InscripcionEvento {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public estadoInscripcion: string,
    public tieneCocheDisponible: any,
    public miembro: Miembro,
    public evento: Evento,
    public problemaAlimenticio?: string,
    public comentarioAdicional?: string,
    public actividadesInteres?: Actividad[]
  ) {}
}
