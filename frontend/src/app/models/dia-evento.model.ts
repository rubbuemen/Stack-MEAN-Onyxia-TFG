import { TramoHorario } from './tramo-horario.model';
import * as mongoose from 'mongoose';

export class DiaEvento {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public fecha: Date,
    public tramosHorarios: TramoHorario[],
    public horaInicio: string,
    public horaFinal: string
  ) {}
}
