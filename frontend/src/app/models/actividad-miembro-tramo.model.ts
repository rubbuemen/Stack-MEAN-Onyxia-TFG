import { Actividad } from './actividad.model';
import { Miembro } from './miembro.model';
import { TramoHorario } from './tramo-horario.model';
import * as mongoose from 'mongoose';
import { DiaEvento } from './dia-evento.model';

export class ActividadMiembroTramo {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public actividad: Actividad,
    public miembro: Miembro,
    public dia: DiaEvento,
    public tramoHorario: TramoHorario
  ) {}
}
