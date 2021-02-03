import { ActividadMiembroTramo } from './actividadMiembroTramo.model';

export class TramoHorario {
  constructor(
    public horaInicio: string,
    public horaFin: string,
    public asociacionesActividadMiembroTramo?: ActividadMiembroTramo[]
  ) {}
}
