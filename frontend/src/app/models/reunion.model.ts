import { AsistenciaMiembroReunion } from './asistencia-miembro-reunion';
import * as mongoose from 'mongoose';

export class Reunion {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public fecha: Date,
    public horaInicio: string,
    public horaFin: string,
    public lugar: string,
    public estadoReunion: string,
    public tipoReunion: string,
    public temasATratar?: string,
    public decisionesTomadas?: string,
    public actaReunion?: string,
    public asistenciasMiembroReunion?: AsistenciaMiembroReunion[],
    public asistenciaMarcadaMiembroAutentificado?: boolean
  ) {}
}
