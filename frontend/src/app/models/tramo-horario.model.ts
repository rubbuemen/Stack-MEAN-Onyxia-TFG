import { ActividadMiembroTramo } from './actividad-miembro-tramo.model';

export class TramoHorario {
  constructor(
    public horaInicio: string,
    public horaFin: string,
    public asociacionesActividadMiembroTramo?: ActividadMiembroTramo[]
  ) {}
}
