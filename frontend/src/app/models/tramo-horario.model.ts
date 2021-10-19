import { ActividadMiembroTramo } from './actividad-miembro-tramo.model';
import * as mongoose from 'mongoose';

export class TramoHorario {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public horaInicio: string,
    public horaFin: string,
    public asociacionesActividadMiembroTramo?: ActividadMiembroTramo[]
  ) {}
}
