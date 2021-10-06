import { Visitante } from './visitante.model';
import { Miembro } from './miembro.model';

import * as mongoose from 'mongoose';

export class Notificacion {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public asunto: string,
    public cuerpo: string,
    public fecha: Date,
    public receptoresVisitantes?: Visitante[],
    public receptoresMiembros?: Miembro[],
    public emisorVisitante?: Visitante,
    public emisorMiembro?: Miembro
  ) {}
}
