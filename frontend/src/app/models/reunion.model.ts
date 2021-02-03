import { AsistenciaMiembroReunion } from './asistenciaMiembroReunion';
export class Reunion {
  constructor(
    public fecha: Date,
    public horaInicio: string,
    public horaFin: string,
    public lugar: string,
    public estadoReunion: string,
    public tipoReunion: string,
    public temasATratar?: string,
    public decisionesTomadas?: string,
    public actaReunion?: string,
    public asistenciasMiembroReunion?: AsistenciaMiembroReunion[]
  ) {}
}
